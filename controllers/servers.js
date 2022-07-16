let servers = [
    { id: 123, name: 'Microsoft', status: 'working' },
    { id: 124, name: 'Aws', status: 'working' },
    { id: 125, name: 'Google Cloud', status: 'working' },
]

export const addLesson = (req, res) => {
    res.status(200).json(servers)
}