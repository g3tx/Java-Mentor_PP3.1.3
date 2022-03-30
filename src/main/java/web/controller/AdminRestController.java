package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import web.model.Role;
import web.model.User;
import web.service.RoleService;
import web.service.UserService;

@RestController
public class AdminRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/admin/roles")
    public ResponseEntity<Iterable<Role>> showAllRoles() {
        return ResponseEntity.ok().body(roleService.getAllRoles());
    }

    @GetMapping("/admin/all")
    public ResponseEntity<Iterable<User>> showAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> newUser(@RequestBody User newUser) {
        userService.saveUser(newUser);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/admin/edit")
    public ResponseEntity<User> editUser(@RequestBody User editUser) {
        userService.saveUser(editUser);
        return ResponseEntity.ok().body(editUser);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

