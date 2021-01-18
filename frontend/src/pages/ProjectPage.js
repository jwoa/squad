import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { listProjectDetails, createProjectTask } from '../actions/projectActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { PROJECT_CREATE_TASK_RESET } from '../constants/projectConstants'

const ProjectPage = ({ history, match }) => {
const [name, setName] = useState('')
const [description, setDescription] = useState('')

    const dispatch = useDispatch();

    const projectDetails = useSelector((state) => state.projectDetails)
    const { loading, error, project } = projectDetails

    const projectCreateTask = useSelector(state => state.projectCreateTask)
    const {
        success: successProjectTask,
        loading: loadingProjectTask,
        error: errorProjectTask,
      } = projectCreateTask
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(successProjectTask) {
            alert('Task Submitted!')
            setDescription('');
            dispatch({ type: PROJECT_CREATE_TASK_RESET });
        }
        dispatch(listProjectDetails(match.params.id))
    }, [dispatch, match, successProjectTask])
    
    // const addToCartHandler = () => {
    //     history.push(`/cart/${match.params.id}?qty=${qty}`)
    // }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProjectTask(match.params.id, {
            name, 
            description
        }))
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <>
            <Meta title={project.name}/>
            <Row>
                <Col md={6}>
                    <Image src={project.image} alt={project.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{project.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {project.numTasks} tasks
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Budget: ${project.budget}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {project.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Budget:
                                    </Col>
                                    <Col>
                                        <strong>{project.budget}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className='btn-block' type='button'>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Task</h2>
                    {project.tasks.length === 0 && <Message>No Tasks</Message>}
                    <ListGroup variant='flush'>
                        {project.tasks.map(task => (
                            <ListGroup.Item key={task._id}>
                                <strong>{task.name}</strong>
                                <p>{task.createdAt.substring(0, 10)}</p>
                                <p>{task.description}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Add Task</h2>
                            {errorProjectTask && <Message variant='danger'>{errorProjectTask}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Task Name</Form.Label>
                                        <Form.Control as='textarea' row='3' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as='textarea' row='3' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Add</Button>
                                </Form>
                            ) : (
                                <Message>
                                    Please <Link to='/login'>sign in</Link> to create a task
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
            )}
            
        </>
    )
}

export default ProjectPage
