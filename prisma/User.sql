BEGIN WORK;
LOCK TABLE "User" IN ACCESS EXCLUSIVE MODE;
DELETE FROM "User";
insert into "User" (id, "userName", email, password, role) values
 (1,'cdeards0','jdefew0@washington.edu','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (2,'mmossom1','sdenyukhin1@goo.gl','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (3,'tcornely2','srooms2@economist.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (4,'bscherme3','smacsorley3@devhub.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (5,'jfulun4','mseabrook4@nifty.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (6,'otorri5','adukes5@ow.ly','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (7,'tgrugerr6','mantushev6@jiathis.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (8,'nguidotti7','rpolleye7@shinystat.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (9,'dker8','etraviss8@businesswire.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (10,'apennings9','lpietrowicz9@wsj.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (11,'dgowlera','dbredea@wufoo.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (12,'zcallicottb','rderbyshireb@pagesperso-orange.fr','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (13,'abirdfieldc','kmebsc@tumblr.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (14,'abisattd','nmclaughlind@un.org','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (15,'wgrigorushkine','rrossbrookee@pen.io','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (16,'oallworthyf','badamovitchf@scribd.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (17,'mchurchwardg','ocovelleg@bing.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (18,'zakkerh','blaceh@uol.com.br','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (19,'icraigmylei','sbrickhilli@usda.gov','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 (20,'mlesleyj','ctattamj@bizjournals.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER');
COMMIT WORK;
