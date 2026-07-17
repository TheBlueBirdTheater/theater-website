// GitHub OAuth step 2: exchange the authorization code for an access token, then hand it
// back to the Decap admin popup via postMessage — the exact contract Decap's github backend
// expects from a self-hosted OAuth provider (see decapcms.org/docs/external-oauth-clients/).
function renderMessagePage(status: 'success' | 'error', payload: Record<string, unknown> | string) {
  const message =
    status === 'success'
      ? `authorization:github:success:${JSON.stringify(payload)}`
      : `authorization:github:error:${JSON.stringify(payload)}`;

  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(${JSON.stringify(message)}, e.origin);
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;
}

export default async (request: Request) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response('Missing OAUTH_GITHUB_CLIENT_ID/OAUTH_GITHUB_CLIENT_SECRET environment variables', {
      status: 500,
    });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = request.headers
    .get('cookie')
    ?.split('; ')
    .find((c) => c.startsWith('oauth_state='))
    ?.split('=')[1];

  if (!code || !state || state !== cookieState) {
    return new Response(renderMessagePage('error', 'Invalid or missing OAuth state'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string;
    error_description?: string;
  };

  if (!tokenData.access_token) {
    return new Response(
      renderMessagePage('error', tokenData.error_description ?? 'GitHub token exchange failed'),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  return new Response(
    renderMessagePage('success', { token: tokenData.access_token, provider: 'github' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Set-Cookie': 'oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      },
    }
  );
};
