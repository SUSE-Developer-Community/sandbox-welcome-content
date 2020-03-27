---
title: Changing your Password
menu:
  nav:
    name: "enhanced_encryption"
    url: "/password/"
    weight: 60
---

When you  first create your sandbox account, you will be provided a randomly generated password. For easier access, you will likely want to change your password to one that's easier to remember. You can do that from the command line or from the Stratos UI.

## From Command Line

To change your password from the command line, log in with your current password and run:

``` bash
> cf passwd

Current Password> 

New Password> 

Verify Password> 
Changing password...
OK
Please log in again
```

## From Stratos

To change your password from Stratos, click on the icon in the top right corner of your screen (see screenshot below), and select `Profile` from the menu that drops down. 

![Profile Access](/images/password/mainpage.png)

Click the pencil on the top right to edit your profile. You can also browse directly to https://stratos.cap.explore.suse.dev/user-profile/edit. If this gives you a 404 error, you are either not logged in or your login has timed out. Logging back in should fix this. 
 
![Profile Access](/images/password/account.png)

Type in current password and new password where appropriate then click `Save`. 

![Profile Access](/images/password/edit_account.png)

