import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Jason Agyekum',
        email: 'jason@seasonsix.co',
        phone: 6464632030,
        bio: 'I code stuff',
        avatar: 'https://pbs.twimg.com/profile_images/1321545076909264896/niBGPjsN_400x400.jpg',
        password: bcrypt.hashSync('Bekoe0625', 10),
        isAdmin: true
    },
    {
        name: 'Kwame Doe',
        email: 'kwame@example.com',
        phone: 9172326789,
        bio: 'Leader of Development',
        avatar: 'https://images.nappy.co/uploads/medium/20200905-doryus-4249-2001599358402mrv7aypveqamlkhdvxi6q5tnjpprgpjjvilpclvg6eawvklycugfvagrlxabqe2m2agfiyf9n2ec4p6kemsqklgaw9mndrmyrbew.jpg?sharp=13&auto=format',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Keisha Jay',
        email: 'keisha@example.com',
        phone: 4649283748,
        bio: 'Chief Financial Officer',
        avatar: 'https://images.nappy.co/uploads/medium/1201596163328yhw56icknoxe5eccpud6wk7cfzswbpptkwz1im6gzli47ux6v9rrye3rgfkztzwkjiseaxpbdcqghbygzzsyqeyqqacxd40pnnmj.jpg?sharp=13&auto=format',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users