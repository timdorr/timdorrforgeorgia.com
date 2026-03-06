import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  // Only protect the index page for now
  if (context.url.pathname === '/') {
    const authHeader = context.request.headers.get('Authorization')

    if (!authHeader) {
      return new Response('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Tim Dorr for Georgia"',
        },
      })
    }

    const authValue = authHeader.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'td' && pwd === '4g') {
      return next()
    }

    return new Response('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tim Dorr for Georgia"',
      },
    })
  }

  return next()
})
