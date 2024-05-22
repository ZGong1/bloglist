// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const totalLikes = blogs => {
    return blogs.reduce((acc, item) => {
        return acc += item.likes
    }, 0)
}

module.exports = { dummy, totalLikes }