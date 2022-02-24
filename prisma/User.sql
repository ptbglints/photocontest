BEGIN WORK;
LOCK TABLE "User" IN ACCESS EXCLUSIVE MODE;
DELETE FROM "User";
insert into "User" ("userName", email, password, role) values
 ('cdeards0','jdefew0@washington.edu','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('mmossom1','sdenyukhin1@goo.gl','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('tcornely2','srooms2@economist.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('bscherme3','smacsorley3@devhub.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('jfulun4','mseabrook4@nifty.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('otorri5','adukes5@ow.ly','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('tgrugerr6','mantushev6@jiathis.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('nguidotti7','rpolleye7@shinystat.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('dker8','etraviss8@businesswire.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('apennings9','lpietrowicz9@wsj.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('dgowlera','dbredea@wufoo.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('zcallicottb','rderbyshireb@pagesperso-orange.fr','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('abirdfieldc','kmebsc@tumblr.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('abisattd','nmclaughlind@un.org','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('wgrigorushkine','rrossbrookee@pen.io','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('oallworthyf','badamovitchf@scribd.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('mchurchwardg','ocovelleg@bing.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('zakkerh','blaceh@uol.com.br','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('icraigmylei','sbrickhilli@usda.gov','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER'),
 ('mlesleyj','ctattamj@bizjournals.com','$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O','USER');
COMMIT WORK;
