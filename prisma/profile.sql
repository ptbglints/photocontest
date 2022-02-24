BEGIN WORK;
LOCK TABLE "Profile" IN ACCESS EXCLUSIVE MODE;
DELETE FROM "Profile";
insert into "Profile" ("userId", name, address, "profilePhoto", "coverPhoto") values
(1,'Fenelia Ewing','03872 Del Mar Circle','https://randomuser.me/api/portraits/men/1.jpg','https://picsum.photos/id/1/800/600'),
(2,'Kit Greneham','82175 Spenser Street','https://randomuser.me/api/portraits/men/2.jpg','https://picsum.photos/id/2/800/600'),
(3,'Rory Radbourne','8050 Glacier Hill Pass','https://randomuser.me/api/portraits/men/3.jpg','https://picsum.photos/id/3/800/600'),
(4,'Lucine Bonner','529 Iowa Trail','https://randomuser.me/api/portraits/men/4.jpg','https://picsum.photos/id/4/800/600'),
(5,'Margalit Pardey','336 Badeau Center','https://randomuser.me/api/portraits/woman/5.jpg','https://picsum.photos/id/5/800/600'),
(6,'Robinet Croney','553 Ruskin Park','https://randomuser.me/api/portraits/men/6.jpg','https://picsum.photos/id/6/800/600'),
(7,'Huntley Duguid','330 Grasskamp Hill','https://randomuser.me/api/portraits/men/7.jpg','https://picsum.photos/id/7/800/600'),
(8,'Lois Asee','4 Luster Lane','https://randomuser.me/api/portraits/woman/8.jpg','https://picsum.photos/id/8/800/600'),
(9,'Rodrique Marl','40010 Lakewood Gardens Hill','https://randomuser.me/api/portraits/men/9.jpg','https://picsum.photos/id/9/800/600'),
(10,'Lucina Stanbrooke','9255 Kipling Way','https://randomuser.me/api/portraits/men/10.jpg','https://picsum.photos/id/10/800/600'),
(11,'Seana Henrys','7 Jay Lane','https://randomuser.me/api/portraits/men/11.jpg','https://picsum.photos/id/11/800/600'),
(12,'Edsel Allardyce','80860 Bobwhite Place','https://randomuser.me/api/portraits/woman/12.jpg','https://picsum.photos/id/12/800/600'),
(13,'Chadd Shand','4 7th Parkway','https://randomuser.me/api/portraits/woman/13.jpg','https://picsum.photos/id/13/800/600'),
(14,'Shelby Caldaro','40 Moose Avenue','https://randomuser.me/api/portraits/men/14.jpg','https://picsum.photos/id/14/800/600'),
(15,'Gates Huncote','881 Johnson Hill','https://randomuser.me/api/portraits/woman/15.jpg','https://picsum.photos/id/15/800/600'),
(16,'Kassie Woolley','0460 Lukken Hill','https://randomuser.me/api/portraits/woman/16.jpg','https://picsum.photos/id/16/800/600'),
(17,'Min MacAllester','09 Cottonwood Park','https://randomuser.me/api/portraits/men/17.jpg','https://picsum.photos/id/17/800/600'),
(18,'Koralle Jambrozek','67 Waxwing Junction','https://randomuser.me/api/portraits/woman/18.jpg','https://picsum.photos/id/18/800/600'),
(19,'Laney Laurentino','69261 Marcy Court','https://randomuser.me/api/portraits/woman/19.jpg','https://picsum.photos/id/19/800/600'),
(20,'Stinky Oxenford','145 Jenna Street','https://randomuser.me/api/portraits/men/20.jpg','https://picsum.photos/id/20/800/600');
COMMIT WORK;
