// functionality to see if the particular user can access a business page. Uses the user id, role id and business id
function isPermitted(permission) {
    // Get user business and role information
    // Check if user belongs to the business
    // Checks to see if user has required permissions to view page
    return function (req, res, next) {
        next()
    }
}

