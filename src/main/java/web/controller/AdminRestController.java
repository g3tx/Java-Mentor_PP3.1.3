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

import java.util.Set;

@RestController
public class AdminRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/admin/userinfo")
    public ResponseEntity<User> showUserInfo() {
        UserDetails details = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = (User) userService.loadUserByUsername(details.getUsername());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/admin/roles")
    public ResponseEntity<Iterable<Role>> showAllRoles() {
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<Iterable<User>> showAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/admin/info/{id}")
    public ResponseEntity<User> showUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping("/admin/add")
    public ResponseEntity<User> newUser(@RequestBody User newUser) {
        userService.saveUser(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/admin/edit")
    public ResponseEntity<User> editUser(@RequestBody User editUser) {
        userService.saveUser(editUser);
        return new ResponseEntity<>(editUser, HttpStatus.OK);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

