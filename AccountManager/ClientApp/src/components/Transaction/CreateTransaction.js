import React, { useState, useEffect, useContext } from 'react'
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { Create, GetAll } from '../../services/ApiService';

function ExtractComponentName(url) {
    const params = url.split('/');
    return params[1];
}

const CreateTransaction = ({ match }) => {
    const context = useContext(UserContext);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let categoriesResponse = [];
        async function fetchData() {
            let response = await GetAll('', 'Categories', context.user.token);

            categoriesResponse = await response.json();
            setCategories(categoriesResponse);
        }

        fetchData();
    }, [categories]);

    const [tags, setTags] = useState([]);
    useEffect(() => {
        let tagsResponse = [];
        async function fetchData() {
            let response = await GetAll('', 'Tags', context.user.token);

            tagsResponse = await response.json();
            setTags(tagsResponse);
        }

        fetchData();
    }, [tags]);

    const onCreateSubmitHandler = (e) => {
        e.preventDefault();
        const transaction = {
            amount: Number(e.target.amount.value),
            categoryId: Number(e.target.category.value),
            description: e.target.description.value,
            tags: e.target.tag.value,
            accountId: match.params.accountId,
        }

        console.log(transaction);
        let entity = ExtractComponentName(match.path);
        let response = {};
        async function postData() {
            response = await Create('', entity, transaction, context.user.token);
            let responseData = await response.json();
            console.log(responseData);
        }

        postData();
    }

    function renderCategories(categories) {
        if (categories.length > 0) {
            return categories.map(x => <option key={x.id} value={x.id}>{x.name}</option>)
        }
    }

    function renderTags(tags) {
        if (tags.length > 0) {
            return tags.map(x => <option key={x.id} value={x.id}>{x.name}</option>)
        }
    }

    return (
        <Form onSubmit={onCreateSubmitHandler}>
            <FormGroup>
                <Label sm={2} for="amount">Amount</Label>
                <Col sm={10}>
                    <Input type="number" id="amount" name="amount" />
                </Col>
            </FormGroup>

            <FormGroup>
                <Label sm={2} for="category">Category</Label>
                <select type='number' name='category'>
                    <option>Select...</option>
                    {renderCategories(categories)}
                </select>
            </FormGroup>

            <FormGroup>
                <Label sm={2} for="tag">Tags</Label>
                <select type='number' name='tag'>
                    <option>Select...</option>
                    {renderTags(tags)}
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