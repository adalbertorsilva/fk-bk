module.exports = (project) => {
    return {
        name: project.name,
        baseUrl: project.baseUrl.baseUrl,
        timestamp: project.timestamp,
    };
};
