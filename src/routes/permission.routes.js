import { Router } from "express";
import { autorizarPermiso, cancelPermission, createPermission, DashboardPermission, deletePermission, filtrarPermisos, getPermissionForAutorizacion, getPermissionForAutorizacionPrece, getPermissionsByUser, topPermissionEmployee, topPermissionPrece, topPermissionStudent } from "../controllers/permission.controller.js";

const router = Router();

router.get("/permission/:Id", getPermissionsByUser);

router.get("/PermissionsPreceptor/:Id", getPermissionForAutorizacionPrece);

router.get("/permissionsEmployee/:Id", getPermissionForAutorizacion);

router.post("/permission", createPermission);

router.delete("/permission/:Id", deletePermission);

router.put("/permission/:Id", cancelPermission);

router.put("/permissionValorado/:Id", autorizarPermiso);

router.get("/permissionTop/Student/:Id", topPermissionStudent);

router.get("/permissionTop/Employee/:Id", topPermissionEmployee);

router.get("/permissionTop/Preceptor/:Id", topPermissionPrece);

router.get("/dashboardPermission/:IdPreceptor", DashboardPermission);

router.get('/permissions/filter/:IdPreceptor', filtrarPermisos);

export default router;
