import axios from 'axios'
import pool from '../../config/database'

const username = 'testuser'
const password = 'testpassword'
let token = ''

describe('Users tests', () => {
    afterAll(() => {
        return clearDatabase()
    })

    it('Returns a username when creating a user that does not exist', async () => {
        const result = await axios.post('http://localhost:3000/api/users/register', { username: username, password: password })
        expect(result.data['user']).toBe('testuser')
    })

    it('Returns conflict when trying to add two of the same entries', async () => {
        const result = await axios.post('http://localhost:3000/api/users/register', { username: username, password: password }, {
            validateStatus: (status: number) => status === 409
        })
        expect(result.status).toBe(409)
    })

    it('Returns the user with a token to use when logging in', async () => {
        const result = await axios.post('http://localhost:3000/api/users/login', { username: username, password: password })
        expect(result.status).toBe(200)
        expect(result.data['token']).toBeDefined()
        token = result.data['token']
    })

    it('Returns the test user when calling get with a token', async () => {
        const result = await axios.get('http://localhost:3000/api/users/' + username, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        expect(result.data['message']).toBeDefined()
    })

    it('Returns unauthorized when trying to delete user without a token', async () => {
        const result = await axios.delete('http://localhost:3000/api/users/' + username, {
            method: 'DELETE',
            validateStatus: (status: number) => status === 401
        })
        expect(result.status).toBe(401)
        expect(result.data['message']).toBe('Authentication failed')
    })

    it('Returns the test user when calling get with a token', async () => {
        const result = await axios.delete('http://localhost:3000/api/users/' + username, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        expect(result.data['message']).toContain('Deleted user')
    })
})

async function clearDatabase() {
    return new Promise(resolve => {
        pool.getConnection((err, connection) => {
            connection.query('delete from users where username = ?', username, () => {
                connection.release()
                resolve()
            })
        })
    })
}