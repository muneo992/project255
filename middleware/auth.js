export default async function ({ redirect }) {
  const auth0 = await import('~/plugins/auth0');
  const user = await auth0.getUser();

  if (!user) {
    return redirect('/'); // ログインしていない場合はホームページにリダイレクト
  }
}
