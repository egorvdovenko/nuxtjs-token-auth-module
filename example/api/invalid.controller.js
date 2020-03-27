export default function (req, res, next) {
  const { headers: { authorization } } = req

  if (authorization !== 'Bearer newToken') {
    next({ statusCode: 401, message: 'Invalid credentials!' })
  } else {
    res.end()
  }
}
