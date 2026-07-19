// Decap CMS always names uploaded media after the original file's name (sanitized for
// unsafe characters only, never shortened) — there's no config option for this
// (https://github.com/netlify/netlify-cms/issues/857, open since 2017). Camera/export
// filenames can be extremely long, so this intercepts the native file input and drop
// events *before* Decap's own handlers read them and swaps in a short generated name.
// Fails silently on anything unsupported — worst case, uploads keep their original name.
(function () {
  function shortenFileName(originalName) {
    var dot = originalName.lastIndexOf('.');
    var ext = dot > -1 ? originalName.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    var base = dot > -1 ? originalName.slice(0, dot) : originalName;
    var slug = base
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 24)
      .replace(/-+$/, '');
    var suffix = Math.random().toString(36).slice(2, 6);
    var name = (slug || 'img') + '-' + suffix;
    return ext ? name + '.' + ext : name;
  }

  function renameFileList(fileList) {
    if (typeof DataTransfer === 'undefined') return null;
    var dt = new DataTransfer();
    var changed = false;
    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[i];
      var newName = shortenFileName(file.name);
      if (newName !== file.name) changed = true;
      dt.items.add(new File([file], newName, { type: file.type, lastModified: file.lastModified }));
    }
    return changed ? dt.files : null;
  }

  // "Choose an image" button path: rename in place on the input before Decap's own
  // change handler (attached in the bubble phase) reads input.files.
  document.addEventListener(
    'change',
    function (event) {
      var input = event.target;
      if (!input || input.tagName !== 'INPUT' || input.type !== 'file' || !input.files || !input.files.length) {
        return;
      }
      try {
        var renamed = renameFileList(input.files);
        if (renamed) input.files = renamed;
      } catch (err) {
        // Reassigning input.files isn't supported in every browser — original name is kept.
      }
    },
    true
  );

  // Drag-and-drop path: the native DataTransfer is read-only during 'drop', so instead of
  // mutating it, cancel the original event and replay a synthetic one carrying a fresh,
  // writable DataTransfer with the renamed file(s).
  document.addEventListener(
    'drop',
    function (event) {
      if (event.__renameUploadsReplay) return; // avoid re-handling our own replayed event
      if (!event.dataTransfer || !event.dataTransfer.files || !event.dataTransfer.files.length) return;
      try {
        var original = event.dataTransfer.files;
        var dt = new DataTransfer();
        var changed = false;
        for (var i = 0; i < original.length; i++) {
          var file = original[i];
          var newName = shortenFileName(file.name);
          if (newName !== file.name) changed = true;
          dt.items.add(new File([file], newName, { type: file.type, lastModified: file.lastModified }));
        }
        if (!changed) return;

        var replay = new DragEvent('drop', {
          bubbles: true,
          cancelable: true,
          dataTransfer: dt,
        });
        replay.__renameUploadsReplay = true;

        event.preventDefault();
        event.stopImmediatePropagation();
        event.target.dispatchEvent(replay);
      } catch (err) {
        // Synthetic drop replay isn't supported in every browser — original name is kept.
      }
    },
    true
  );
})();
