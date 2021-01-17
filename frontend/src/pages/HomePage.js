import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Project from '../components/Project'
import { listProjects } from '../actions/projectActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const HomePage = ({ match }) => {

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();
    const projectList = useSelector(state => state.projectList)
    const { loading, error, projects, page, pages } = projectList;

    useEffect(() => {
        dispatch(listProjects(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta/>
            {!keyword ? (
                <ProjectCarousel />
            ) : (
                <Link to='/' className='btn btn-light'>
                Go Back
                </Link>
            )}
            <h1>Latest Projects</h1>
            {loading ? (
                <Loader/>
            ) : error ? ( 
                <Message variant='danger'></Message>
            ) : (
                <>
                <Row>
                    {projects.map((project) => (
                        <Col key={project._id} sm={12} md={6} lg={4} xl={3}>
                            <Project project={project} />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
            
        </>
    )
}

export default HomePage
