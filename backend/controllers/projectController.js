import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

// @desc   Fetch all projects
// @route  GET api/projects
// @access Public
const getProjects = asyncHandler(async (req, res) => {
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {

    }

    const count = await Project.countDocuments({ ...keyword })
    const projects = await Project.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))

    res.json({ projects, page, pages: Math.ceil(count / pageSize) })
})

// @desc   Fetch single projects
// @route  GET api/projects/:id
// @access Public
const getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if(project) {
        res.json(project)
    } else {
        res.status(404)
        throw new Error('Project not found')
    }
})

// @desc   Delete a project
// @route  DELETE api/projects/:id
// @access Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if(project) {
        await project.remove()
        res.json({ message: 'Project removed' })
    } else {
        res.status(404)
        throw new Error('Project not found')
    }
})

// @desc   Create a project
// @route  POST api/projects/
// @access Private/Admin
const createProject = asyncHandler(async (req, res) => {
    const project = new Project({
        name: 'Sample Project Name',
        budget: 0,
        user: req.user._id,
        image: 'images/sample.jpg',
        category: 'Sample category',
        numTasks: 0,
        description: 'Exciting new project . . .'
    })

    const createdProject = await project.save()
    res.status(201).json(createdProject)
})

// @desc   Update a project
// @route  PUT api/projects/:id
// @access Private/Admin
const updateProject = asyncHandler(async (req, res) => {
    const { name, budget, description, image, category } = req.body

    const project = await Project.findById(req.params.id)

    if(project) { 
        project.name = name
        project.budget = budget
        project.description = description
        project.image = image
        project.brand = brand
        project.category = category

        const updatedProject = await project.save()
        res.json(updatedProject)
    } else {
        res.status(404)
        throw new Error('Project not found')
    }
})

// @desc   Create new task
// @route  POST api/projects/:id/tasks
// @access Private
const createProjectTask = asyncHandler(async (req, res) => {
    const { description } = req.body

    const project = await Project.findById(req.params.id)

    if(project) { 

       const task = {
           name: req.user.name,
           description,
           user: req.user._id
       }

       project.tasks.push(task)
       project.numTasks = project.tasks.length

       await project.save()
       res.status(201).json({ message: 'Task added' })

    } else {
        res.status(404)
        throw new Error('Project not found')
    }
})

// @desc   Get top rated projects
// @route  GET api/projects/top
// @access Public
// const getTopProjects = asyncHandler(async (req, res) => {
//     const projects = await Project.find({}).sort({ rating: -1}).limit(3)

//     res.json(projects)
// })

export {
    getProjects,
    getProjectById,
    deleteProject,
    createProject,
    updateProject,
    createProjectTask,
    // getTopProjects
}