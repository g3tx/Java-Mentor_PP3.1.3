package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import web.service.RoleService;
import web.service.UserService;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String getLoginPage() {
        return "login";
    }

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/admin")
    public String getIndexPage(Model model) {
            /*UserDetails details = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = (User) userService.loadUserByUsername(details.getUsername());
            model.addAttribute("user", user);
            model.addAttribute("users", userService.getAllUsers());
            model.addAttribute("listOfRoles", roleService.getAllRoles());
            model.addAttribute("formNewUser", new User());*/
        return "index";
    }
}
