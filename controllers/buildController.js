const asyncHandler = require("express-async-handler");
const BuildModel = require("../db/models/buildModel");

// @desc Return list of all builds
// @route get /api/v1/builds
// @access admin

const buildIndex = asyncHandler(async (req, res) => {});

// @desc Return user's builds
// @route get /api/v1/builds/me
// @access owner of build/admin

const getMyBuilds = asyncHandler(async (req, res) => {});

// @desc Return single build
// @route get /api/v1/builds/:id
// @access admin, owner of build

const getBuild = asyncHandler(async (req, res) => {});

// @desc Create build
// @route post /api/v1/builds
// @access registered user

const createBuild = asyncHandler(async (req, res) => {});

// @desc Update build
// @route put /api/v1/builds/:id
// @access owner of build/admin

const updateBuild = asyncHandler(async (req, res) => {});

// @desc Delete build
// @route delete /api/v1/builds/:id
// @access Owner of build/admin

const deleteBuild = asyncHandler(async (req, res) => {});

module.exports = {
    getBuild,
    getMyBuilds,
    buildIndex,
    createBuild,
    updateBuild,
    deleteBuild
}