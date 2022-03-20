create schema if not exists spring_mvc_security_hibernate collate utf8mb4_0900_ai_ci;

drop table if exists t_roles;
create table t_roles
(
    roleId  bigint unsigned auto_increment unique primary key not null,
    roleName varchar(250) unique null,
    constraint role_id unique (roleId)
)
    charset = utf8;

INSERT INTO t_roles (roleId, roleName)
VALUES (1, 'ROLE_ADMIN'),
       (2, 'ROLE_USER');

drop table if exists t_users;
create table t_users
(
    userId   bigint unsigned auto_increment unique primary key not null,
    password  varchar(250) null,
    firstName varchar(250) null,
    lastName  varchar(250) null,
    age       bigint       null,
    email     varchar(250) unique not null,
    constraint user_id unique (userId)
)
    charset = utf8;

INSERT INTO t_users (userId, password, firstName, lastName, age, email)
VALUES (1, '$2a$12$UmXTqpzuG.38VRVT9Vp2r.KWvY0XXftOEow/9P.xYtXtFCBJmczg6', 'admin', 'admin', 0, 'admin@mail.ru'),
       (2, '$2a$12$LhgKNh0ap2.SdftZAw4idus0o9DW13WbQyiO9SaBagVnrXF5QULOW', 'user', 'user', 0, 'user@mail.ru'),
       (3, '$2a$12$3N8Lqz8aMKQbBpFFA6avouHVzvm2U5K3z.MGsj5XmWMIB0jqNowCa', 'Thor', 'Odinson', 2098, 'GodOfThunder@gmail.com'),
       (4, '$2a$12$WaZU5Q5kEekLAhYjWd/0d..zpmf7/RuhS33fiJaq/i.h1h.waarT2', 'Loki', 'Laufeyson', 2059, 'GodOfMischiefr@gmail.com'),
       (5, '$2a$12$MHxCgH6nQlSqUfZVH4wKcuWGgda0JODso/th/v7DpvNnqMh1CzWaq', 'Odin', 'Borson', 6089, 'AllFather@gmail.com'),
       (6, '$2a$12$aHCAgyCWfKYlYIyE2/u9POj1i/YjjqXKgG8N3h7AtHs5sixpCSHi6', 'Hela', 'Odinson', 3574, 'GoddessOfDeath@gmail.com');

drop table if exists t_users_roles;
create table t_users_roles
(
    user_id bigint unsigned null,
    role_id bigint unsigned null,
    constraint hasrole foreign key (role_id) references t_roles (roleId) on update cascade on delete cascade,
    constraint hasuser foreign key (user_id) references t_users (userId) on update cascade on delete cascade
)
    charset = utf8;

INSERT INTO t_users_roles (user_id, role_id)
VALUES (1, 1), -- User Admin has role ADMIN
       (2, 2), -- User User has role USER
       (3, 2), -- User Thor has role USER
       (4, 2), -- User Loki has role USER
       (5, 1), -- User Odin has role ADMIN
       (5, 2), -- User Odin has role USER
       (6, 2); -- User Hela has role USER

-- Только в таком виде работает и не выходит ошибка: Cannot delete or update a parent row: a foreign key constraint fails
-- drop if exist + create
