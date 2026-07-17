// GitHub OAuth step 1: redirect the Decap admin's login popup into GitHub's authorize flow.
// Paired with callback.mts. Requires OAUTH_GITHUB_CLIENT_ID set as a Netlify env var.
export default async (request: Request) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response('Missing OAUTH_GITHUB_CLIENT_ID environment variable', { status: 500 });
  }

  const url = new URL(request.url);
  const state = crypto.randomUUID();

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      // Checked against the callback's ?state= to guard against CSRF on the redirect.
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
};
