// Registers the site's brand fonts/colors into Decap's entry preview iframe, using the
// documented CMS.registerPreviewStyle API — sandboxed to the preview pane only, not a hack
// on Decap's own editor chrome (which has no supported theming API as of this version).
CMS.registerPreviewStyle('/admin/preview.css');
