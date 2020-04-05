import axios from 'axios'

describe('Categories tests', () => {
    it('Returns categories for user', async () => {
        const result = await axios.get('http://localhost:3000/api/categories')
        expect(result.data).toBeDefined()
    })
})
