package web.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "t_roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roleId")
    private Long roleId;

    @Column(name = "roleName")
    private String roleName;

    @ManyToMany(mappedBy = "roles")
    @JsonBackReference
    //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "user_id")
    private Set<User> users;

    public Role() {
    }

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Role(Long roleId, String roleName) {
        this.roleId = roleId;
        this.roleName = roleName;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long id) {
        this.roleId = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String name) {
        this.roleName = name;
    }

    @JsonIgnore
    @Override
    public String getAuthority() {
        return roleName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return Objects.equals(roleId, role.roleId) &&
                Objects.equals(roleName, role.roleName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, roleName);
    }

    @Override
    public String toString() {
        return roleName;
    }

/*  //убираем приставку ROLE (нужно для отображения в таблице)
    public String getRolenameWithoutSuf() {
        return rolename.replace("ROLE_", "");
    }*/
}
