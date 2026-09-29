import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (list) => list.forEach(({ name, value, options }) => event.cookies.set(name, value, { ...options, path: '/' }))
    }
  });

  // getUser() memverifikasi token ke server Supabase (lebih aman daripada getSession)
  event.locals.getUser = async () => {
    const { data, error } = await event.locals.supabase.auth.getUser();
    return error ? null : data.user;
  };

  return resolve(event, {
    filterSerializedResponseHeaders: (name) => name === 'content-range' || name === 'x-supabase-api-version'
  });
};
