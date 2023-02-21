import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import App from '../App'


describe("testit 6.3-6.9",function(){

    test("6.3",function(){

        const { container } = render(<App/>)

        const div = container.querySelector('.note')
        console.log(div)


    })

})
