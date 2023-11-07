'use client'
const Home = () => {
  const handleClick = async () => {
    fetch('/api/category/65486a7dfc5c1333cdf9a71f', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: 'afaafd' }),
    })
      .then((x) => {
        console.log(x)
        return x.json()
      })
      .then((x) => {
        console.log(x)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <section>
      <button onClick={handleClick}>click</button>
    </section>
  )
}

export default Home
