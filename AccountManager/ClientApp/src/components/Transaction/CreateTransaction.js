import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input, Button, Col} from 'reactstrap';
import { Create, GetAll } from '../../services/ApiService';

const CreateTransaction = ({ match }) => {

    const [categories, setCategories] = useState([]);
    useState(() => {
        GetAll(null, 'Categories')
            .then(data => setCategories({ categories: data }));
    }, [categories]);

    const [tags, setTags] = useState([]);
    useState(() => {
        GetAll(null, 'Tags')
            .then(data => setCategories({ tags: data }));
    }, [tags]);

    const onCreateSubmitHandler = (e) => {
        e.preventDefault();
        const transaction = {
            amount: Number(e.target.amount),
            category: Number(e.target.category),
            description: e.target.description,
            tags: e.target.tag,
            accountId: match.params.accountId,
        }
    }

    return (
        <Form onSubmit={onCreateSubmitHandler}>
            <FormGroup>
                <Label sm={2} for="amount">Amount</Label>
                <Col sm={10}>
                    <Input type="text" id="amount" name="amount" />
                </Col>
            </FormGroup>

            <FormGroup>
                <Label sm={2} for="category">Category</Label>
                <select type='number' name='category'>
                    {categories.map(x => <option value={x.id}>{x.name}</option>)}
                </select>
            </FormGroup>

            <FormGroup>
                <Label sm={2} for="tag">Tags</Label>
                <select type='number' name='tag'>
                    {tags.map(x => <option value={x.id}>{x.name}</option>)}
                </select>
            </FormGroup>

            <FormGroup>
                <Label sm={2} for="description">Description</Label>
                <Col sm={10}>
                    <Input type='text-area' id="description" name="description" />
                </Col>
            </FormGroup>
            <Col>
                <Button outline color="primary" >Create</Button>
            </Col>
        </Form>
    )
}

export default CreateTransaction;