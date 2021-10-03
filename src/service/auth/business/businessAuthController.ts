const router = express.Router();
const businessAuthService = require('./businessAuthService')

router.get('/business/:businessId/roles', async (req: any, res: any) => {
    try {
        return businessAuthService.getBusinessRole(req.params.businessId)
    }
    catch (e) {
        throw e
    }
    
});

router.get('/business/:businessId/roles', async (req: any, res: any) => {
    try {
        return businessAuthService.getBusinessRoles(req.params.businessId)
    }
    catch (e) {
        throw e
    }
    
})

router.get('/business/:businessId/role/:roleKey', async (req: any, res: any) => {
    try {
        return businessAuthService.getBusinessRoleByKey(req.params.businessId, req.params.roleKey)
    }
    catch (e) {
        throw e
    }
    
});

// NOT YET IMPLEMENTED
router.post('/business/:businessId/role', async (req: any, res: any) => {
    try {
        // Must implement permissions routes
        const newPermissions = ''
        const role = {
            businessId: req.params.businessId,
            name: req.body.roleName,
            permissions: newPermissions,
        }
        return businessAuthService.createBusinessRole(req.params.businessId, role)
    }
    catch (e) {
        throw e
    }
    
});

// NOT YET IMPLEMENTED
router.put('/business/:businessId/role/roleKey', async (req: any, res: any) => {
    try {
        // Must implement permissions routes
        const newPermissions = ''
        const role = {
            businessId: req.params.businessId,
            name: req.body.roleName,
            permissions: newPermissions,
        }
        return businessAuthService.createBusinessRole(req.params.businessId, role)
    }
    catch (e) {
        throw e
    }
    
});