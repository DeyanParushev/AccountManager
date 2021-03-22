import { Component } from 'react'
import React from 'react'

export default class Form extends Component {
    render() {
        return (
            <form method="POST" action="/Expenses">
                <label for="category" >Category</label>
                <input type="number" name="category" value="1" placeholder="default value is 1" />

                <label for="description" >Description</label>
                <input type="text" name="description"/>

                <label for="amount" >Amount</label>
                <input type="number" name="amount" step="0.001" />

                <label for="imageUrl">Image</label>
                <input type="file" name="imageUrl" accept="image.png, image.jpeg" />

                <button type="submit">Submit</button>
            </form>
        );
    }
}

