// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

const totalLikes = blogs => {
    return blogs.reduce((acc, item) => {
        return acc += item.likes
    }, 0)
}

const favoriteBlog = blogs => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = blogs => {

    var users = {}
    blogs.forEach(item => {
        if (!users[item.author]) {
            users[item.author] = 1
        } else {
            users[item.author] = users[item.author]+1
        }
    })
    
    var max = {author: 'placeholder', blogs: -1}

    Object.entries(users).forEach( ([key, value]) => {
        if (value > max.blogs) {
            max = {author: key, blogs: value}
        }
    })

    return max
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }