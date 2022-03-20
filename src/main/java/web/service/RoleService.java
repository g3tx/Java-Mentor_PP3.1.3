package web.service;


import web.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {

    public void createRoles(Set<Role> roles);
    Set<Role> getAllRoles();
}
