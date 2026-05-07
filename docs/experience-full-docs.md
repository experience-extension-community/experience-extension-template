# Ellucian Experience — Full Documentation

> **Source PDF:** `experience-full-docs_20260506.pdf` (May 6, 2026, 160 pages)
> **Note:** Body text was extracted via OCR (the source PDF's body fonts use
> Identity-H encoding without a usable ToUnicode mapping, blocking direct text
> extraction). Heading structure comes from PyMuPDF font analysis. Embedded
> screenshot UI labels appear inline in OCR'd prose where the original PDF showed
> a screenshot. Hyperlinks from the source are not preserved.

---

## Table of Contents

- [Ellucian Experience overview](#ellucian-experience-overview)
- [User roles for Experience documentation](#user-roles-for-experience-documentation)
- [Ellucian Experience release notes](#ellucian-experience-release-notes)
- [Experience 2.4](#experience-24)
- [Experience SDK 8.1.2](#experience-sdk-812)
- [Experience 2.3](#experience-23)
- [Experience 2.2](#experience-22)
- [Experience 2.1](#experience-21)
- [Experience SDK 8.0.1](#experience-sdk-801)
- [Experience 2.0](#experience-20)
- [2025 Releases](#2025-releases)
  - [Experience 1.99](#experience-199)
  - [Experience SDK 7.18.1](#experience-sdk-7181)
  - [Experience 1.98](#experience-198)
  - [Experience 1.97.2](#experience-1972)
  - [Experience 1.97.1](#experience-1971)
  - [Experience 1.97](#experience-197)
  - [Experience 1.96](#experience-196)
  - [Experience 1.95](#experience-195)
  - [Experience 1.94.2](#experience-1942)
  - [Experience 1.94](#experience-194)
  - [Experience 1.93](#experience-193)
  - [Experience 1.92 and Experience SDK 7.18.0](#experience-192-and-experience-sdk-7180)
  - [Experience 1.91](#experience-191)
  - [Experience 1.90 and Experience SDK 7.17.1](#experience-190-and-experience-sdk-7171)
  - [Experience 1.89](#experience-189)
  - [Experience 1.88 and Experience SDK 7.16.0](#experience-188-and-experience-sdk-7160)
  - [Experience 1.87.1](#experience-1871)
  - [Experience 1.87 and Experience SDK 7.15.0](#experience-187-and-experience-sdk-7150)
  - [Experience 1.86](#experience-186)
  - [Experience 1.85 and Experience SDK 7.14.0](#experience-185-and-experience-sdk-7140)
  - [Experience 1.84](#experience-184)
  - [Experience 1.83](#experience-183)
- [Configure Ellucian Experience](#configure-ellucian-experience)
- [High-level procedure for implementing Experience](#high-level-procedure-for-implementing-experience)
- [About Experience configuration](#about-experience-configuration)
  - [Experience architecture](#experience-architecture)
  - [Experience prerequisites](#experience-prerequisites)
  - [Experience integration with Ellucian solutions](#experience-integration-with-ellucian-solutions)
  - [Experience instances and Ethos environments](#experience-instances-and-ethos-environments)
  - [Multi-institution Experience](#multi-institution-experience)
  - [Experience domains and IP addresses](#experience-domains-and-ip-addresses)
- [Connect the integrated solution to Ethos Integration](#connect-the-integrated-solution-to-ethos-integration)
- [Connect Ellucian Experience to Ethos Integration](#connect-ellucian-experience-to-ethos-integration)
  - [Create a user for proxy API requests](#create-a-user-for-proxy-api-requests)
  - [Create an application in Ethos Integration for Ellucian](#create-an-application-in-ethos-integration-for-ellucian)
  - [Experience](#experience)
  - [Add credentials to the Experience application](#add-credentials-to-the-experience-application)
  - [Set up GraphQL requests to Data Access](#set-up-graphql-requests-to-data-access)
  - [Enter the API key in Ellucian Experience](#enter-the-api-key-in-ellucian-experience)
- [(Banner MEP)](#banner-mep)
  - [Create a user for proxy API requests (Banner MEP)](#create-a-user-for-proxy-api-requests-banner-mep)
  - [Create the applications in Ethos Integration for Ellucian](#create-the-applications-in-ethos-integration-for-ellucian)
  - [Experience (Banner MEP)](#experience-banner-mep)
  - [Add credentials to the Experience application (Banner MEP)](#add-credentials-to-the-experience-application-banner-mep)
  - [Enter the API keys in Ellucian Experience (Banner MEP)](#enter-the-api-keys-in-ellucian-experience-banner-mep)
- [Whitelisting to support Experience](#whitelisting-to-support-experience)
- [Set up Ellucian Experience with an identity provider](#set-up-ellucian-experience-with-an-identity-provider)
  - [Set up person identifiers](#set-up-person-identifiers)
  - [(Multi-institution) Set up the institution affiliation attribute](#multi-institution-set-up-the-institution-affiliation-attribute)
  - [Set up Ellucian Experience with AD FS](#set-up-ellucian-experience-with-ad-fs)
  - [Set up Ellucian Experience with Entra ID](#set-up-ellucian-experience-with-entra-id)
  - [Set up Ellucian Experience with Ethos Identity](#set-up-ellucian-experience-with-ethos-identity)
  - [Set up Ellucian Experience with Shibboleth](#set-up-ellucian-experience-with-shibboleth)
- [Set up roles for Ellucian Experience](#set-up-roles-for-ellucian-experience)
  - [Set up identity provider roles](#set-up-identity-provider-roles)
  - [Set up Banner roles for Experience](#set-up-banner-roles-for-experience)
  - [Set up Colleague roles for Experience](#set-up-colleague-roles-for-experience)

---

## Ellucian Experience overview

#### Overview

#### Experience integration with Ellucian solutions

#### Experience tiers and ERP support

#### Access to Ellucian applications from Experience

Ellucian Experience provides a single entry point into an institution for constituents
across the learning community, allowing them to gain the knowledge and access they
need to better engage with the institution.

Ellucian Experience aggregates content from multiple systems, including your ERP
(Banner, Colleague, or PowerCampus) and other Ellucian solutions, and displays the data
in cards on the user's dashboard. In addition to cards, the user's dashboard displays
announcements created by your institution and notifications targeted to that user; links to
resources and social media; and a calendar (available with Experience Premium).

The content each user sees is tailored to that user, both by pulling in that user's data from
other systems and by delivering content based on user role (such as student, faculty,
etc.). Your institution sets up the roles, assigns roles to users, and then uses those roles
to provide appropriate access to content.

Responsive design supports display on computers, tablets, and smartphones.

Ellucian Experience is connected through Ethos Integration with an Ellucian ERP or other
Ellucian solution. ERP implementations provide Experience/ERP integration features such
as academic details on the Profile page, the use of Ethos roles, and ERP holds displayed
as notifications in Experience. Non-ERP implementations provide a limited feature set,
such as administrator access to Experience cards supporting that solution.

The Foundation version of Ellucian Experience includes basic features such as theming, a
customizable menu, announcement creation, and content templates for creating low-
code or no-code cards. Experience Premium provides additional features.

Banner and Colleague support all features of Experience Foundation and Experience
Premium. PowerCampus supports the features of Experience Foundation.

The Ellucian Experience dashboard provides a launching point to configure and use other
Ellucian applications. Access points include:

- Cards - Experience users can view a summary of information in an Experience card

<!-- page 12 -->

#### Cards

#### Pages

and navigate from there to Experience pages for that application.

- Application menu - Experience users can access Experience pages for some Ellucian
applications from the Application menu in the Experience Bar.

Cards are displayed on the Experience user's home page, and provide the primary entry
point for delivering content to users. Cards can embed information, share dynamic and
live data, and be customized to display any content. A card can provide a summary of
information, with more detailed information provided in an associated Experience page or
in an external URL.

An Experience user's dashboard can include both cards delivered with Experience and
cards you create:

e Delivered cards for which the type of information and format are pre-defined. See
Ellucian-delivered cards.

- Card templates from which your institution can create your own cards. See Create a
card from a template.

e Cards that developers at your institution create using the Ellucian Experience Software
Development Kit (SDK), available with Experience Premium.

Each user has access to cards that are enabled by the institution and for which the user
has a role assigned to the card. The user's home page displays cards that have been
locked on the home page by an administrator and cards that the user has saved. The user
can also access the All Cards page to view all cards available to them, or category pages
(such as Academics or Community) for a focused view of only the cards in that category.
From either the All Cards page or a category page, the user can save cards for display on
their home page.

Ellucian Experience pages occupy the entire Experience content area, and provide more
detailed information than a card. Pages can be of two types:

e Pages you create with the Page Designer, an intuitive, no-code user interface for
creating pages in Experience. You can create a link to these pages from Experience
content or elsewhere, and you can make these pages either publicly available to
anyone with the link or available only to Experience users based on role. The Page
Designer is available with Experience Premium.

e Pages provided by an Experience extension. Ellucian-delivered extension pages can be
accessed from either an Experience card or from the Application menu in the

<!-- page 13 -->

#### The Experience App

#### Supported browsers

#### Infrastructure

Experience Bar:

- Acard is typically used when the goal is to provide a summary of information on the
dashboard. From the card, users can access the page for more information. An
example is the Classes card delivered by Ellucian.

- The Application menu is typically used when the immediate goal is to access the
page to configure or use an application. An example is access to Person Manager
from the Application menu.

Extension pages created by developers at your institution, using the Experience SDK,
can be accessed from an Experience card.

The Experience App provides Experience users with the same content as the browser-
based Experience web application, presented in a mobile app that takes advantage of
native mobile features. The mobile application appears in the Apple App Store and Google
Play Store as your institution's app, with customizable branding (app name, icon,
descriptive text, and preview images). The Experience App is available with Experience
Premium.

For the browsers and browser versions supported with Ellucian Experience, see the
matrix attached to the Ellucian Global Web Browser Support Policy and Matrix.

Ellucian Experience is managed by Ellucian in the Ellucian Cloud. There are no
components you need to install at your institution.
Ellucian Experience uses a SAML 2.0-compliant identity provider for authentication and
authorization for Experience users. Ellucian Experience has been tested with AD FS, Entra
ID, Ellucian Ethos Identity, and Shibboleth.
Multi-institution systems that share an ERP and use the same identity provider instance
can use the optimized multi-institution features of Ellucian Experience. The multi-
institution feature set enables the deployment of a single data infrastructure to multiple
institutions, providing a unified and centralized way to manage information. The multi-
institution feature set of Experience is available with additional licensing for Experience
Premium customers.

Retrieval of user information from the integrated solution uses Ellucian Ethos Integration.

<!-- page 14 -->

#### Configuring Ellucian Experience

#### Extending Ellucian Experience

## User roles for Experience documentation

Basic configuration occurs in the Ellucian Experience Setup application. In Ellucian
Experience Setup, system administrators configure an identity provider, set up roles and
permissions, and perform other basic setup.

Content editors (users who have been assigned administrative permissions) maintain
content from the Configuration area within Ellucian Experience. Content editors can apply
a custom theme, create and configure cards, and create announcements.

The Ellucian Experience Software Development Kit (SDK) provides the ability to extend
Ellucian Experience by creating extensions that include your own content. Developers
create extensions using the Experience SDK, and Experience administrators manage
those extensions in the Extension Management area of Ellucian Experience Setup. The
Experience SDK is available with Experience Premium.

Ellucian defines user roles to facilitate faster and more accurate searches on the Ellucian
Documentation site. When you search the Experience documentation, you can filter the
search results by user role.

Note: These user roles defined for documentation searches are not related to the
Experience roles that support Experience content access and permissions.

The user roles defined for Ellucian documentation are general areas of responsibility that
can align with different job titles, which might overlap depending on the size and structure
of your institution.

<!-- page 15 -->

User role for
document

Ellucian Experi

Functions of this role for Ellucian Experience

ence overview

System
administrator

Set up and maintain your institution's Experience implementation
from within the Experience Setup application. Functions include
configuring an identity provider, setting up roles and permissions,

and implementing the Experience mobile app.

Office administrator

Maintain Experience content from within the Configuration area
of Experience. Functions include creating and configuring cards,
creating pages with the Page Designer, creating announcements,

and applying a custom theme.

Data analyst

Use the data monitoring features provided within Experience

along with Google Analytics to better understand how Experience
is used at your institution.

Developer Use the Experience SDK to extend Experience by creating
extensions that include custom content.

Student support Guide students and other Experience users in their use of

Experience.

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 16 -->

## Ellucian Experience release notes

## Experience 2.4

#### Updates

## Experience SDK 8.1.2

#### Upgrade to Ellucian Path Design System v8.4.0 and ds-icons v5.3.0

#### Upgrade to Node.js 24.13.0

These release notes describe new features, enhancements, and updates in Ellucian
Experience releases.

Experience 2.4 provides xxx.

For a list of the issues addressed in Experience 2.4, see the Related Defects and Related
Enhancements tabs on the release page for Experience 2.4 in the Ellucian Customer
Center.

Experience SDK 8.1.2 includes an upgrade to new versions of the Ellucian Path Design
System and ds-icons.

SDK 8.1.2 includes an upgrade to Ellucian Path™ Design System (Path) v8.4.0 and ds-
icons v5.3.0.

Both Path 8.3.0 and 8.4.0 have been released since the last SDK release. Ellucian has
updated the focused style of several components to improve accessibility. This change
slightly increases the focused size of these components; you may need to update your
layouts to accommodate this. For details on these and other enhancements in Path 8.3.0
and Path 8.4.0, see the Ellucian Path Design System release notes.

For a summary of dependency versions for all versions of the SDK, see the spreadsheet
attached to Dependency bundles.
Upgrade to Node,js 24.13.0

Extensions created with SDK 8.1.2 or later require Node.js 24.13.0. To upgrade the
Node js version:

- Install Node.js 24.13.0 as described in Install Node.js.

e When you update the dependencies in the package. json file, delete the package-

<!-- page 17 -->

#### Upgrading your extensions

## Experience 2.3

#### Production release - Manage permissions by role

#### Classes card and page - multiple meeting schedules

lock. json file and the node_modules directory before running npm install .

To upgrade an existing extension to SDK 8.1.2, use the appropriate procedure depending
on the current version of the extension:

e Upgrade to the latest SDK 8.x version from an earlier SDK 8.x version

e Upgrade to SDK 8.x from SDK 7.x or earlier

Experience 2.3 provides the option to manage Experience permissions by role in

Production environments, along with enhancements to the Classes card and Page
Designer.

Note: This enhancement was released to Experience Test environments with
Experience 2.1, and is being released to Production environments with this release.

The Permissions area in Experience Setup now includes a new Roles and Users tab that
displays all of the permissions assigned to one role or user within a particular resource
group. This view provides an intuitive view of permissions inheritance, and allows you to
view and maintain all of the permissions (parent and all children) at the same time. For
the details, see Manage permissions by role.

Previously, a class with multiple meeting schedules might not display properly on the
Classes card or page. With this release:

- On the Classes card and the term view of the Classes page, if a class has more than
two meeting schedules, only the first two are initially displayed. The user can click
Additional meetings available to go to the class detail view of the page where more
meeting schedules are displayed. The screen shot below is an example for the card.

- On the class detail view of the page, the number of meeting schedules initially
displayed depends on the space available. If there are more meeting schedules, the
user can click Show more to see all of the meeting schedules.

<!-- page 18 -->

#### Page Designer enhancements

#### resources  and about  endpoints

#### Updates

Classes |

Last updated Mar 17, 2026 7:40 AM

>

Q

Cross Reg Testing v

AMST 115 US History to Civil War

Tue/Thu 11:00 AM - 11:50 AM
Traditiona
Jan 1, 2022 - Dec 31, 2025 D-
Mon 1:00 AM - 1:11 AM
Traditiona

Jan
Additional meetings available

BIOL 100 Biology OLR

Wed/Sat 9:00 AM - 10:00 AM f(A) -«

For Page Designer pages built with the HTML editor, styling around the content has
changed. You will see less padding on the page. If you have added advanced styling
through the HTML, check that the page is still behaving as expected.

For Page Designer pages built with the rich text editor, the header will now stay in place
when scrolling.

Previously, Experience configuration included defining resources and about
endpoints for the Banner or Colleague Ethos APIs. To simplify the configuration process
and avoid issues when those endpoints were not properly defined, Ellucian has modified
Experience to no longer require those endpoints.

No action is required for Experience implementations where those endpoints have
already been defined. They will be ignored.

For a list of the issues addressed in Experience 2.3, see the Related Defects and Related
Enhancements tabs on the release page for Experience 2.3 in the Ellucian Customer
Center.

<!-- page 19 -->

## Experience 2.2

#### Update to the Experience App (rebuild required)

#### Updates

## Experience 2.1

#### Manage permissions by role

Experience 2.2 provides an update to the Android version of the Experience App.

This release fixes two issues with the Android version of the Experience App:

- mailto links not working on free-format cards. See Product Defect PD0031000 in the
Ellucian Customer Center.

e Header display issues on Android devices. See PD0032221.
To provide these fixes to your users, rebuild the Android version of the Experience App

using the instructions in (New app) Build the Android app.

For a list of the issues addressed in Experience 2.2 and subsequent patch releases, see
the Related Defects and Related Enhancements tabs on the following release pages in
the Ellucian Customer Center:

e Release page for Experience 2.2

e Release page for Experience 2.2.1

Experience 2.1 provides the option to manage Experience permissions by role in Test
environments.

Note: The option to manage permissions by role is available in Experience Test
environments with Experience 2.1, and will be available in Production environments
in a future release.

Experience application permissions are managed in the Permissions area in Experience
Setup. With this release, there are now two tabs on the Permissions page, providing two
options for viewing and managing permissions:

e The Resources tab is the existing view of permissions, displaying all of the roles and

<!-- page 20 -->

#### Update to viewing multiple dashboards in a multi-institution implementation

users who are assigned permissions on a particular resource. This view supports
assigning permissions on a resource to multiple roles and users at the same time.
However, when permissions are defined in a parent/child hierarchy, you can view or
assign permissions for only one resource at a time (the parent or one of the children).

- The Roles and Users tab, shown in the screen shot below, is a new view that displays
all of the permissions assigned to one role or user within a particular resource group.
This view provides an intuitive view of permissions inheritance, and allows you to view
and maintain all of the permissions (parent and all children) at the same time.

Each view has advantages and limitations. You might use both views within the same
session to assign permissions and view the results of your changes.

For a detailed description, see Permissions views: resource and role. The procedure for
Grant Experience application permissions has been updated to describe both options.

Experience Platform Permissions fa); 2°": v

Experience Dev Team: Test

Resources Roles and Users

sey Dashboard Configuration v

admin
| a 5)

alumni

a)
AnalyticsTeamDev Resource Manage (©
APPLICANT
Vv Dashboard Configuration |
Application/ei-test-administrator
- Card Management
apprentice
apprentice_admin Announcements
Bruno Rogers
Main Menu
Duke Johnson
edm_admin_staff Theming

employee

Calendar

employer

Ervin Naja Page Management

EXECUTIVE

In a multi-institution implementation of Experience, users who need access to multiple
dashboards can select from a list of dashboards on the user profile avatar, if you have set
up that feature as described in (Multi-institution) Set up the institution affiliation attribute.

<!-- page 21 -->

#### Updates

## Experience SDK 8.0.1

Previously, selecting a dashboard would open that dashboard within the current browser
tab, replacing the dashboard that the user had been viewing. With this release, selecting a
dashboard opens that dashboard in a new browser tab.

For a list of the issues addressed in Experience 2.1, see the Related Defects and Related
Enhancements tabs on the release page for Experience 2.1 in the Ellucian Customer
Center.

Experience SDK 8.0.1 is a major update that includes upgrades to new major versions of
React, the Ellucian Path Design System, and ESLint. These upgrades provide significant
enhancements but also include potentially breaking changes.

<!-- page 22 -->

#### Enhancements in SDK 8.0.1

#### Upgrading your extensions

Supporting Significant enhancements Reference

application

React v19 React 19 Upgrade Guide and

- Native support for React v19 release announcement
asynchronous transitions

e Native support for document
metadata

e Native support for style sheets

e Improvements to refs: refs as
standard props, cleanup
functions

Path v8.2.2 Path v7 to v8 Migration Guide
Support for React 19

New form field styling

Many bug fixes

Breaking changes to several
components

ESLint v9.33.0 ESLint 9.x Migration Guide
Faster configuration resolution

and file processing

e Uses flat configuration, which
provides simple configuration
merging

Better ES module support

To upgrade an existing extension to SDK 8.0.1, use the procedure in Upgrade to SDK 8.x
from SDK 7.x or earlier.

<!-- page 23 -->

## Experience 2.0

#### AI Writing Assistant in Free-form card and Page Designer (ERP SaaS only)

Experience 2.0 provides the Ellucian Gen Al Writing Assistant in Experience rich text
editors, and an update to the supported Android versions of the Experience App.

Note: The Al Writing Assistant is available for ERP SaaS customers. It is available
now in Experience for customers in the U.S. region, and will be available in other
regions in the future.

The Ellucian Gen Al Writing Assistant uses artificial intelligence (Al) to help you quickly
create or edit content. The Al Writing Assistant is available in the rich text editors in the
Page Designer (when using the rich text editor option) and the Free-form template card.
The Ask AI ®% icon is visible in the rich text editor toolbar to users who have been granted
the required permissions in Ellucian Experience Setup.

The Al Writing Assistant uses both text that you enter in the text editor and contextual
information about your role, your institution, and your current task to generate suggested
content. If you don't know where to start, you can initiate the session without any text,
and the Al Writing Assistant will provide suggested content based on contextual
information about you and your task. The screen shot below shows an example using the
Al Writing Assistant within the Page Designer.

For a more detailed description and the procedures, see Use the Al Writing Assistant in
Experience and Grant permissions for the Al Writing Assistant.

<!-- page 24 -->

#### Experience App requires Android 12

#### Updates

## 2025 Releases

— Oo 2 ©
Experience / Page Designer XX al Writing Assistant D> Ox
Upcoming Blood Drive @ © | save | Oyen) 1

@ Content Sent to AI

Please join us in supporting the Red Cross with their

N : u 1x zee =z: )
vormal Bie Ala x 8 upcoming blood drive.
@oBa x 9¢

Generated with Al
Please join us in supporting the Red Cross with their upcoming blood drive. Elaborate

Please join us in supporting the Red Cross with their
upcoming blood drive. Your donation can help save up to
three lives! The blood drive will be held in partnership with
the American Red Cross, who will ensure all safety protocols
are followed.

Why Donate Blood?

Key Benefits of Donating

+ One donation can save multiple lives
+ It takes only about an hour of your time

+ You'll receive a free health screening

- Your body replenishes the donated blood within 24 '

USE SELECTED CONTENT

Ask Al for ideas

Please verify the accuracy of all Al-generated responses.

The minimum supported Android version for the Experience App has been updated from
Android 9 to Android 12.

When you build the Experience App after the release of Experience 2.0 and publish it to
the Google Play Store, users with Android devices with older operating systems will be
unable to upgrade to the latest version, or will be unable to install the app if they have not
yet done so.

For a list of the issues addressed in Experience 2.0 and subsequent patch releases, see
the Related Defects and Related Enhancements tabs on the following release pages in
the Ellucian Customer Center:

e Release page for Experience 2.0

e Release page for Experience 2.0.1

<!-- page 25 -->

### Experience 1.99

#### API key security enhancement - Experience card configuration

#### Experience App - upgrade to iOS 26 SDK

#### Updates

Experience 1.99 provides an API key security enhancement in Experience card
configuration and an update to the Experience App.

For some Experience cards, API keys are entered in card configuration within the
Configuration area of Experience. Previously, the full API key was sent to the web browser
when a user accessed the configuration for a previously-configured card. The API key
was displayed in the UI as a row of asterisks, but could be viewed using developer tools.

With this release, only the first five characters of the API key are sent to the web browser
when a user accesses Experience. The UI initially displays the API key as a row of
asterisks. The user can use a new Show link to view the first five characters of the API
key. For example, you could click the Show link to confirm that the Ethos API key for the
desired Ethos application had been entered. Viewing the partial entry would likely be
sufficient for this purpose.

To update the API key, you would enter the new key. An existing API key cannot be edited.

Beginning April 2026, Apple will require that all iOS and iPadOS apps uploaded to Apple
App Store Connect or published to the Apple App Store must be built with iOS 26 SDK or
later. Experience 1.99 includes updates that support the iOS 26 SDK.

This means that any build of the Experience App that you publish to the Apple App Store
starting in April 2026 must have been built from the Mobile Application tab in Experience
Setup after the release of Experience 1.99.

Existing published apps built with earlier versions of Experience will continue to work
after April 2026. This requirement affects only apps that are submitted or published after
April 2026.

For a list of the issues addressed in Experience 1.99 and subsequent patch releases, see
the Related Defects and Related Enhancements tabs on the following release pages in
the Ellucian Customer Center:

e Release page for Experience 1.99

e Release page for Experience 1.99.1

<!-- page 26 -->

### Experience SDK 7.18.1

#### Upgrade to Ellucian Path Design System v7.19.1

#### Upgrading your extensions

### Experience 1.98

#### Instructional method displayed in Classes and Class Schedule cards (Colleague)

e Release page for Experience 1.99.2

SDK 7.18.1 includes an upgrade to a new version of the Ellucian Path Design System.

SDK 7.18.1 includes an upgrade to Ellucian Path™ Design System (Path) v7.19.1. For
details on the enhancements in Path 7.19.1, see the Ellucian Path Design System release
notes.

For a summary of dependency versions for all versions of the SDK, see the spreadsheet
attached to Dependency bundles.

To upgrade an existing extension to SDK 7.18.1, use the procedure in Upgrade to the
latest SDK 7.x version.

Experience 1.98 provides the display in the Classes and Class Schedule cards of the
instructional method from Colleague, and other updates.

Note: This capability was previously available for Banner, and is now also available
for Colleague.

The Classes and Class Schedule cards can now display the instructional method from
Colleague:

e For the Classes card, the instructional method is displayed on the card and on both the
term view and class detail view of the Experience page that is accessed from the card.

e For the Class Schedule card, the instructional method is displayed on the class detail
view of the card.

The value displayed is the description from the instructional method codes that you
define on the ISTM form and associate with section meeting information on the SOFF

<!-- page 27 -->

#### Update to the Experience App (rebuild required)

#### Updates

form in Colleague. In the example screen shots below, the value is "Online."
To take advantage of this feature, do the following:

e Install Colleague Web API 2.7 or later. Colleague Web API 2.7 includes changes to the
section-schedule-information API that support this enhancement.

e In Ethos Integration, ensure that the Ethos application for Colleague owns the
section-schedule-information resource.

e In the Classes or Class Schedule card configuration, enable the Enable improved
performance (requires Banner API 9.34.1+ or Colleague Web API 2.7+) toggle
switch.

This change addresses IDEA0001728 in the Ellucian Customer Center.

Classes card Class Schedule card

Classes : ow < ARTH 322-01: Renaissance: Gi.. : Wf

Aug 26, 5 - Dec 3 a Credits: 3

AGME 100 Introductory Agricultural Mech Meeting information
Mon/Wed/Fri 8:00 AM - 8:50 AM Mon/Wed/Fri, 9:00 AM-10:00 AM
Lecture, John D plex 130 > Online

5

— Aug 26, 2025 - Dec 31, 2025
Tue 11:00 AM - 11:50 AM

Aug 26, 2025 -

Learning n Deere Complex 11¢

Instructors
Not assigned

Aug 26,

ARTH 322 Renaissance: Giotto to Bellini

Mon/Wed/Fri 9:00 AM - 10:00 AM

This release fixes an issue with sign-in to the iOS version of the Experience App,
described in Product Defect PD0023677 in the Ellucian Customer Center.

To provide this fix to your users, rebuild the iOS version of the Experience App using the
instructions in Build the iOS app.

For a list of the issues addressed in Experience 1.98, see the Related Defects and Related
Enhancements tabs on the release page for Experience 1.98 in the Ellucian Customer
Center.

<!-- page 28 -->

### Experience 1.97.2

#### Experience 1.97 releases

#### (Action required) Permissions inheritance in Production environments

#### Updates

### Experience 1.97.1

#### Experience 1.97 releases

Experience 1.97.2 provides inheritance for Experience permissions in Production
environments and other updates.

As part of our readiness for the upcoming release of permissions inheritance to
Experience Production environments, the Ellucian Experience team has pushed a series
of Experience 1.97.x releases to Test environments to ensure production readiness. All
Experience 1.97.x features, including permissions inheritance, are scheduled for release
to Production environments with Experience 1.97.2. For the details, see the post in
Ellucian Community and Knowledge Article KB000512077, "Experience 1.97 Releases."

Permissions inheritance was released to Experience Test environments with Experience
1.97.0 and is being released to Experience Production environments with Experience
1.97.2. With permissions inheritance, you can now grant permissions at the parent level
and those permissions are automatically granted for all resources at the child level. For a
detailed description, see Permissions inheritance enhancement.

To enable permissions inheritance, perform the procedure in Enable permissions
inheritance. If you have defined any permissions for Ellucian Insights, use the procedure
in Enable inherited permissions for systems with Insights instead.

For a list of the issues addressed in Experience 1.97.2, see the Related Defects and
Related Enhancements tabs on the release page for Experience 1.97.2 in the Ellucian
Customer Center.

Experience 1.97.1 provides simultaneous access to multiple dashboards and an API key
security enhancement in Experience Setup. These features are being released to

Experience Test environments with Experience 1.97.1, and scheduled for release to
Experience Production environments with Experience 1.97.2.

As part of our readiness for the upcoming release of permissions inheritance to

<!-- page 29 -->

#### Simultaneous access to multiple dashboards

#### API key security enhancement - Experience Setup

Experience Production environments, the Ellucian Experience team has pushed a series
of Experience 1.97.x releases to Test environments to ensure production readiness. All
Experience 1.97.x features, including permissions inheritance, are scheduled for release
to Production environments with Experience 1.97.2. For the details, see the post in
Ellucian Community and Knowledge Article KB000512077, "Experience 1.97 Releases."

Some Experience users have access to multiple dashboards. Examples include:

e Institutions with multiple tenants (such as Test and Development) within the
Experience Test environment.

e Institutions with Production and SaaSProduction tenants within the Experience
Production environment.

e Institutions using the multi-institution features of Experience. These institutions have a
system-level tenant and multiple institution-level tenants within the Experience
Production environment.

Previously, if a user wanted to have multiple dashboards open at the same time, they
would have to use different browsers or an incognito window. Now, with enhancements
to session management, the user can simultaneously view the dashboards for multiple
tenants using the same browser, in separate browser tabs or windows.

The API key for the Ethos application for Ellucian Experience is entered on the Dashboard
Setup tab in Ellucian Experience Setup. Previously, the full API key could be viewed on that
tab using a Show/Hide button. With this release, only the first five characters of the API
key are sent to the web browser when a user accesses Experience Setup. The Dashboard
Setup tab displays those five characters followed by a row of asterisks. The Show/Hide
button has been removed. To replace the API key, the user clicks the new Edit icon #.

<!-- page 30 -->

### Experience 1.97

#### Experience 1.97 releases

#### (Action required) Permissions inheritance enhancement

#### Permissions inheritance enhancement

Ellucian Experience Setup 3

Dashboard Setup Identity Provider Service Provider Claims User Activi

Dashboard Access

Ellucian Ethos ration API key *

GCAAQE RE RREEKKKA KEE KEKE EERE EKER ERER e | VALIDATE |

Experience 1.97 provides inheritance for Experience permissions in Test environments.

As part of our readiness for the upcoming release of permissions inheritance to
Experience Production environments, the Ellucian Experience team has pushed a series
of Experience 1.97.x releases to Test environments to ensure production readiness. All
Experience 1.97.x features, including permissions inheritance, are scheduled for release
to Production environments with Experience 1.97.2. For the details, see the post in
Ellucian Community and Knowledge Article KB000512077, "Experience 1.97 Releases."

Experience application permissions are configured in the Permissions area of Ellucian
Experience Setup. For resources that are defined in a parent/child hierarchy, you can now
grant permissions at the parent level and those permissions are automatically granted for
all resources at the child level. For a detailed description, see Permissions inheritance
enhancement.

To enable permissions inheritance, perform the procedure in Enable permissions
inheritance. If you have defined any permissions for Ellucian Insights, use the procedure
in Enable inherited permissions for systems with Insights instead.

For permissions defined in a parent/child hierarchy, permissions granted at the parent
level now apply to all child resources below it.

<!-- page 31 -->

#### Overview

#### Cleanup of existing permissions

Experience application permissions are configured in the Permissions area of Ellucian
Experience Setup. For some applications, the resources are defined in a hierarchy. With
this release, you can now grant permissions at the parent level of the hierarchy and those
permissions are automatically granted for all resources at the child level, where you can
view but not remove the permission.

For example, Experience dashboard configuration permissions can be defined at the
Dashboard Configuration level or the individual resource level (Card Management,
Announcements, etc.). You can now grant roles or users the Manage permission at the
Dashboard Configuration level, and those users will have the Manage permission on all of
the dashboard configuration resources.

H 4 s = Environments
Experience Platform Permissions ET] | Eyperience Dev Team: Test v
Resources Roles and Users
| Dashboard Configuration Vv Dashboard Configuration /\
Card Management
- Q
Announcements
a
Role or U .
Main Menu AYROLLDIR Manage @
Theming
admin
Calendar
Page Management AnalyticsTeamDev

If you grant the Manage permission at the Dashboard Configuration level, and then view
the permissions for one of the child resources, such as Card Management, the
permissions check box is disabled (grayed-out) and you cannot remove the permission.

To ensure that you understand the impact of your changes, including inherited
permissions, the procedure for granting permissions now includes a Confirm Changes to
Permissions dialog that appears after you click Save. The dialog describes each
permission change that will be made.

For more details, see Permissions inheritance. That topic covers key concepts in
permissions inheritance, including recursive permissions and the impact of the future
addition of child resources.

In previous releases, the permissions check boxes could be selected at the parent level

<!-- page 32 -->

#### Ellucian Insights

#### Enable permissions inheritance

#### About this task

#### Procedure

(the Dashboard Configuration level in the example above), but selecting those check
boxes had no effect, meaning the role or user did not receive that permission for the child
resources. The permission had to be assigned to each child resource individually.

To ensure that there is no change in users' permissions, the upgrade process clears any
check boxes selected at the parent level. As noted above, this does not change the actual
permissions that users have because selecting those check boxes previously had no
effect. If desired, you can now select those check boxes at the parent level and those
permissions will be inherited for the child resources.

Ellucian Insights has its own logic for interpreting permissions that is different from other
Ellucian products. For more about Insights permissions, see Insights reporting tool
permissions.

When you first access the Permissions area in Ellucian Experience Setup after the release

that includes inherited permissions, you will need to perform this procedure to enable
permissions inheritance.

Note: If you have defined any permissions for Ellucian Insights, there are special
considerations for the upgrade. Use the procedure in Enable inherited permissions
for systems with Insights instead of this procedure.

For multi-institution implementations, enable permissions first at the institution level for
each institution, and then at the system level:

1. Perform the procedure below at the institution level for each institution in your system.
To access institution-level permissions, select the institution-level tenant when
accessing Experience Setup.

2. Perform the procedure below at the system level. To access system-level permissions,
select the system-level tenant when accessing Experience Setup.

1. Access Ellucian Experience Setup:

a. In the Ellucian Customer Center, click Tools and then select the desired

<!-- page 33 -->

#### What to do next

### Experience 1.96

Experience Setup instance under the Experience category:
- Click Experience Setup to access the Production instance of Experience Setup.
- Click Experience Setup Test to access the Test instance of Experience Setup.

c. (If applicable) In Experience Setup, in the Environments drop-down, select the
desired Ethos environment.

The option to select an environment is available only if multiple Ethos
environments are associated with this Experience Setup instance.

4. In the Experience Setup header, click Permissions.

Accessing the Permissions tab automatically initiates the upgrade. The next step
depends on your existing permissions setup:

- If you previously selected any check boxes at the parent level in the permissions
resource hierarchy, you will see an Enable Inheritance page that lists those
previously-selected parent-level permissions. Click ACKNOWLEDGE AND PROCEED
to acknowledge that those parent-level check boxes will be cleared during the
upgrade.

Explanation: Before this upgrade, it was possible to select the check boxes at the
parent level, although that had no effect. If those previously-selected parent
permissions were left in place during the upgrade, the child resources would inherit
hose permissions, meaning there would be an unintended change to user
permissions. To prevent that unintended change, the upgrade process clears any
check boxes previously selected at the parent level.

e If no parent-level check boxes were previously selected, you will not see the Enable
nheritance page, and the upgrade proceeds automatically with no action required.

You can now assign inherited permissions to roles and users. The general procedure is in
Grant Experience application permissions.

Experience 1.96 provides enhancements to the Classes card and Experience notifications
along with other updates.

<!-- page 34 -->

#### Option to display only verified grades in the Classes card (Colleague)

#### Realtime display of notifications

Note: This capability was previously available for Banner, and is now also available
for Colleague.

The Classes card and page can display grades from Colleague in a summary grade
displayed within a circular gauge chart and within a Grades table on the class detail view
of the page. The displayed grades are based on your entry in the Grade type code for
Grade Indicator setting in Classes card configuration.

Colleague institutions can now specify that final grades will be displayed only if the grade
is verified. This capability uses the TRANSCRIPT option in the Grade type code for Grade
Indicator setting. The TRANSCRIPT option is supported only if you have enabled the
Enable improved performance setting in Classes card configuration and have installed
Colleague Web API 2.8 or later.

See Grades displayed on the Classes card and page for a detailed description of valid
entries in the Grade type code for Grade Indicator setting and the resulting display of
grades.

Experience users access their notifications by clicking the Notifications icon Qin the
Experience Bar. A red dot next to the icon indicates a new notification that the user has
not yet seen. Clicking the Notifications icon opens the Notifications pane, which displays
the user's notifications.

In previous releases, there was a delay of up to one hour between the triggering of the
notification and the display of the notification in Experience, and users might have to
refresh the browser to see the red dot indicating a new notification. With this release, both
the notification and the red dot are displayed within a few seconds of when the
notification is triggered, without the need for a browser refresh. (Notifications for ERP
holds might require up to one minute before being displayed in Experience because of the
method used to retrieve notification data from the ERP.)

<!-- page 35 -->

#### Update to the Experience App (rebuild required)

#### Updates

### Experience 1.95

### Experience 1.94.2

#### Display of Common Course Number for California Community Colleges

This release fixes an issue with memory page sizes within the Android version of the
Experience App. Details are in Product Defect PD0027067 in the Ellucian Customer
Center.

To provide this fix to your users, rebuild the Android version of the Experience App using
the instructions in (New app) Build the Android app.

For a list of the issues addressed in Experience 1.96, see the Related Defects and Related
Enhancements tabs on the release page for Experience 1.96 in the Ellucian Customer
Center.

Experience 1.95 is a maintenance release that further strengthens Ellucian's security
posture and access control protocols. For details, see the release page for Experience
1.95 in the Ellucian Customer Center.

This is an update to the Experience permissions service. The Experience application (the
dashboard) and Experience Setup have not been updated, and the version displayed on
both of those applications remains 1.94.0.

Experience 1.94.2 provides updates to the Classes card, including the display of the
Common Course Number for California Community Colleges in Banner implementations.

This is an update to the Experience Classes service. The Experience application (the
dashboard) and Experience Setup have not been updated, and the version displayed on
both of those applications remains 1.94.0.

California Community Colleges use a common course numbering system across all
colleges in the system. In Banner, the Common Course Number is entered in the Course
Alias field on the SCACRSE form. Previously, the Classes card and page always displayed
the entry in the Course Number field on SCACRSE. With this release, the Classes card and
page now displays the entry in the Course Alias field if it exists; otherwise, the entry in the
Course Number field is displayed.

<!-- page 36 -->

#### Updates

### Experience 1.94

#### Experience mobile app supports Android 16

#### Updates

### Experience 1.93

#### Update to the Experience App (rebuild required)

For Colleague, no update was needed. The appropriate course number (either the basic
course number or the Common Course Number) is entered in the same field in Colleague,
which is displayed on the Classes card and page.

This release addresses Product Defect PD0026473 and Product Enhancement
PE0006984 in the Ellucian Customer Center.

For the release deployment schedule for Experience Test and Production environments,
see the release page for Experience 1.94.2 in the Ellucian Customer Center.

Experience 1.94 provides support for Android 16 in the Experience App and other minor
updates.

The Experience App has been upgraded to support Android 16. The App now supports
Android 9 through 16.

To provide this enhancement to your users, rebuild the Android version of the Experience
App using the instructions in (New app) Build the Android app.

For a list of the issues addressed in Experience 1.94, see the Related Defects and Related
Enhancements tabs on the release page for Experience 1.94 in the Ellucian Customer
Center.

Experience 1.93 provides an update to the Experience App and other minor updates.

This release contains updates to the Experience App. To provide these updates to your
users, rebuild the iOS and Android versions of the Experience App using the instructions
in (New app) Build the Android app and Build the iOS app.

<!-- page 37 -->

#### Updates

### Experience 1.92 and Experience SDK 7.18.0

#### Experience 1.92

#### Productivity Cards

For a list of the issues addressed in Experience 1.93 and subsequent patch releases, see
the Related Defects and Related Enhancements tabs on the following release pages in

the Ellucian Customer Center:
e Release page for Experience 1.93

e Release page for Experience 1.93.1

Experience 1.92 includes Productivity Cards
their institutional Google or Microsoft email

that provide Experience users with access to
and documents.

This release includes new Productivity Cards that provide Experience users with access
to their institutional Google or Microsoft email and documents. The Productivity Cards

are available with Experience Premium. Furt

The Productivity Cards were previously avail
Ellucian customers could download from Gi
SDK. If you implemented those versions of t
Ellucian recommends that you transition to
of these enhancements:

her details on each type are provided below.

able within Experience extensions that

Hub and implement using the Experience

he cards, they will continue to work. However,
he new delivered versions to take advantage

e After an Experience user signs in to Goog
remains active for six months unless the
requiring users to sign in to the cards eve

e After signing in through the Experience w

le or Microsoft through the cards, the sign-in
user signs out before that, rather than
ry time they sign in to Experience.

eb application, users are automatically

signed in on the Experience mobile app, and vice-versa.

e The Google Productivity Cards are suppo

rted on the Experience mobile app.

Transitioning to the delivered cards also ensures that you will benefit from any future

enhancements to the cards.

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 38 -->

#### Google Productivity Cards

#### Microsoft Productivity Cards

The Google Productivity Cards provide users with access to their institutional Gmail and

Google Drive:

The Gmai

| card displays the 10 most recent inbox emails from a user's Gmail account.
The user can click on any email in the card to launch Gmail and open that email.

The Google Drive card displays the 10 most recently modified documents from a

user's Google Drive account. The user can click on any file name in the card to launch

the Goog
To use the G

For more de

Gmail

@ canvas 07/10/25
New assignment posted in ENG101
Please submit your annotated bibliography by...

@ Financial Aid 07/09/25
Action Required: FAFSA Missing Info
Samantha, your 2025-26 FAFSA application is...

Student Services 07/07/25

Your advising appointment is confirmed
You're scheduled to meet with Dr. Baines on...

@ Spotity 07/06/25
Your July mix is ready
Samantha, here's your monthly blend of summer...

e Drive web application and open the selected file.

iP |

oogle Productivity Cards, you must have a Google Workspace account.

ails and the configuration procedures, see Google Productivity Cards.

Google Drive : OW

Group Project - History.pptx
Modified: July 5, 2025 Johnson, Frank

Study Abroad Budget.xlsx
Modified: June 30, 2025 by Johnson, Frank

Scholarship Application.docx
Modified: June 12, 2025 Johnson, Frank

ENG101_FinalEssay.docx
Modified: May 29, 2025 by Johnson, Frank

Resume_Samantha_2025.pdf
Modified: May 10, 2025 by Johnson, Frank

en eee Tenn de

The Microsoft Productivity Cards provide users with access to their institutional Outlook
and OneDrive:

t

The Outlook card displays the 10 most recent inbox emails (both read and unread)
from a user's Outlook account. The user can click on any email in the Experience card
o launch Outlook and open that email.

The OneDrive card displays the 10 most recently modified documents from a user's

OneDrive account. The user can click on any file name in the card to launch the
Microsoft OneDrive web application and open the selected file.

To use the Microsoft Productivity Cards, you must have a Microsoft Azure/Office 365

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 39 -->

#### Update to the Experience App to support the Productivity Cards (rebuild required)

#### Updates

#### Experience SDK 7.18.0

#### Upgrade to Ellucian Path Design System v7.19.0 and ds-icons v4.15.0

account.

For more details and the configuration procedures, see Microsoft Productivity Cards.

Outlook an | OneDrive : OW
@ Canvas 7/10/25 x Group Project - History.pptx
©) New assignment posted in ENG101 Modified: July 5, 2025 by Johnson, Frank

Please submit your annotated bibliography by...
Study Abroad Budget.xlsx

@ Financial Aid 7/09/25 Modified: June 30, 2025 by Johnson, Frank
- Action Required: FAFSA Missing Info ; a
Samantha, your 2025-26 FAFSA application is... o Scholarship Application.docx
Modified: June 12, 2025 by Johnson, Frank
Student Services 7/07/25 :
$S> Your advising appointment is confirmed fw ENG101_FinalEssay.docx

You're scheduled to meet with Dr. Baines on... Modified: May 29, 2025 by Johnson, Frank

Resume_Samantha_2025.pdf

@ Spoti 07/06/25
potify "Os Modified: May 10, 2025 by Johnson, Frank

S$ Your July mix is ready
Samantha, here's your monthly blend of summer...

If you implement the Productivity Cards and you are using the Experience App, you will
need to rebuild iOS and Android versions of the Experience App using the instructions in
(New app) Build the Android app and Build the iOS app.

For a list of the issues addressed in Experience 1.92, see the Related Defects and Related
Enhancements tabs on the release page for Experience 1.92 in the Ellucian Customer
Center.

SDK 7.18.0 includes an upgrade to new versions of the Ellucian Path Design System and
ds-icons.

SDK 7.18.0 includes an upgrade to Ellucian Path™ Design System (Path) v7.19.0 and ds-
icons v4.15.0.

Path 7.19.0 provides enhancements including anew AdvancedTable component
designed for efficiently displaying, managing, and interacting with large datasets ina
structured format. For details on the AdvancedTable component and other

<!-- page 40 -->

#### Upgrading your extensions

### Experience 1.91

#### Improved performance in the Classes and Class Schedule cards (Colleague)

#### Production release - Enhancements to grades displayed in the Classes card and

#### page

enhancements in Path 7.19.0, see the Ellucian Path Design System release notes.
For a summary of dependency versions for all versions of the SDK, see the spreadsheet
attached to Dependency bundles.

To upgrade an existing extension to SDK 7.18.0, use the procedure in Upgrade to the
latest SDK 7.x version.

Experience 1.91 provides enhancements to the Classes and Class Schedule cards.

The Classes and Class Schedule cards retrieve information from Colleague through the
Colleague Web API. The latest versions of the section-registration-information
and section-schedule-information APIs, delivered with Colleague Web API 2.7,
support improved performance for those cards for Colleague. The performance
improvements are now available for both Banner and Colleague.

To take advantage of the performance improvements, do the following:
- Install Colleague Web API 2.7.

e In Ethos Integration, ensure that the Ethos application for Colleague owns the
section-registration-information and section-schedule-information
resources.

e In Classes card configuration, enable the setting labeled Enable improved
performance (requires Banner API 9.34.1+ or Colleague Web API 2.7+).

The procedure for Set up the Classes and Class Schedule cards has been updated with

instructions for using this enhancement with Colleague.

Note: This enhancement was released to Experience Test environments with
Experience 1.90, and is being released to Production environments with this release.

The Classes card and page can display grades from Colleague or Banner, in a summary

<!-- page 41 -->

#### Update to the Experience App (rebuild required)

grade displayed within a circular gauge chart and within a Grades table on the class detail
view of the page. The image below shows an example of the class detail view of the page
with both the summary grade and Grades table. The displayed grades are based on your
entry in the Grade type code for Grade Indicator setting in Classes card configuration.

This release provides enhancements to the display of grades:

lf you leave the Grade type code for Grade Indicator setting blank, no grades are
displayed. Previously, the grades table showed final and midterm grades even when
that setting was left blank.

- Banner institutions can specify that final grades will be displayed only if the grade is
verified (rolled). This capability uses the new TRANSCRIPT option in the Grade type
code for Grade Indicator setting. The TRANSCRIPT option is supported only if you
have enabled the Enable improved performance setting in Classes card configuration,
which requires Banner Ethos API 9.34.1 or later.

See Grades displayed on the Classes card and page for a detailed description of valid
entries in the Grade type code for Grade Indicator setting and the resulting display of
grades.

— Eloyce University

la
Classes wy

< CLASSES ARCH 148 Architecture 148

Tue/Thu 9:00 AM - 10:30 AM
Face to Face, Computer Information & Science 100
Aug 1, 2024 - Sep 15, 2024

Grades

J Jake M Tomlinson

Final

This release fixes an issue with the Android version of the Experience App, described in
Product Defect PD0023509 in the Ellucian Customer Center.

To provide this fix to your users, rebuild the Android version of the Experience App using
the instructions in (New app) Build the Android app.

<!-- page 42 -->

#### Updates

### Experience 1.90 and Experience SDK 7.17.1

#### Experience 1.90

#### Classes card grades enhancement in Test environments only

#### Alt text for theme background image

#### Updates

#### Experience SDK 7.17.1

For a list of the issues addressed in Experience 1.91, see the Related Defects and Related
Enhancements tabs on the release page for Experience 1.91 in the Ellucian Customer
Center.

Experience 1.90 provides enhancements to the Classes card and the Theming
configuration.

The Experience 1.90 release to Test environments included an enhancement that allows
you to specify that final grades will be displayed only if the grade is verified (rolled). After
the Test release, an issue was discovered that impacted the display of grades when the
FINAL grade code option is used. As a result, this enhancement is not being released to
Production environments with Experience 1.90. It will be included in a later release.

When you set up a custom theme for Experience on the Theming tab in Experience
Configuration, you can specify either a color or an image for the header background. If
you specify an image, you can now specify Alt (alternative) text for the image, used by
screen readers to describe the image to blind or low-vision users. For the updated
procedure, see Apply a custom theme to Ellucian Experience.

For a list of the issues addressed in Experience 1.90, see the Related Defects and Related
Enhancements tabs on the release page for Experience 1.90 in the Ellucian Customer
Center.

SDK 7.17.1 does not include new or enhanced features, but does include updates that
enhance the security of the SDK.

<!-- page 43 -->

#### Upgrading your extensions

### Experience 1.89

#### Updates to the Experience App (rebuild required)

#### Updates

### Experience 1.88 and Experience SDK 7.16.0

#### Experience 1.88

#### Experience dashboard enhancements in Production environments

To upgrade an existing extension to SDK 7.17.1, use the procedure in Upgrade to the
latest SDK 7.x version.

Experience 1.89 addresses issues with the Experience App in addition to other updates.

This release fixes two issues with the Experience App, described in PD0019409 and
PD00233371 in the Ellucian Customer Center.

To provide these fixes to your users, rebuild the Experience App using the instructions in
(New app) Build the Android app and Build the iOS app.

For a list of the issues addressed in Experience 1.89, see the Related Defects and Related
Enhancements tabs on the release page for Experience 1.89 in the Ellucian Customer
Center.

Experience 1.88 provides dashboard enhancements in Production environments, updates
to the News and Events Feed template, and other enhancements and updates.

The following enhancements were released to Experience Test environments with
Experience 1.87 and are being released to Experience Production environments with
Experience 1.88.

- Improved card display on user dashboards (home page tabs)
e Experience header items open in a drawer

See the Experience 1.87 release notes for the details.

<!-- page 44 -->

#### Enhancements to the News and Events Feed template (formerly the RSS Feed

#### template)

You can use the News and Events Feed template to create a card that displays an RSS or
Atom feed. This release includes enhancements to the template:

- The name of the template in the Select Card Template dialog has been changed to
News and Events Feed (was RSS Feed) to reflect that the card can display either RSS
or Atom feeds.

Previously, the Configuration section of card setup included only the entry of the feed
URL. With this release, the Configuration section includes new settings, shown in the
image below, with which you can customize the date/time format, sort order, and other
information displayed in the card. For a description of each setting, see the updated
procedure for Create a News and Events Feed card.

This change addresses IDEA-70434 in the Ellucian Customer Center.

e When the number of news items is large, the card initially displays only the first 50
items, with a MORE button at the bottom of the feed to display additional items. This
change improves the loading time when the feed contains a large number of items.

Previously, Ellucian recommended that you ensure the news feeds were limited to 50
or fewer items to optimize performance. With the addition of the MORE button, that is
no longer necessary.

e Ellucian migrated the News and Events Feed template card to an Experience extension
or consistency with other Ellucian-delivered cards and to support future development.
Extension information is displayed in the Configuration section of card setup. The
migration does not change the card behavior.

<!-- page 45 -->

#### Individual API key for iOS app

#### Updates to the Experience App (rebuild required)

News and Events Feed Template

iv} Details Vv
iv} Configuration
Extension Information Name: Foundation, Publisher: Ellucian, Group: Ellucian Experience, Version: 1.86.0, SDK Version: 7.6.1

Settings Errors

RSS or Atom feed URL*
https://rss.nytimes.com/services/xml/rss/nyt/World.xml
+

List Style

Show Description

Date Style
@ Absolute © Both © Relative

Display Time

Sort Order

@© Newest to Oldest © Oldest to Newest

- News refreshes every 30 minutes. If there are errors refreshing your news feed, check back here and click the Errors tab above.

Ellucian Experience uses an API key to securely access Apple when uploading your
mobile app to the Apple Store. In the past, Apple supported a single API key used to
manage all of your apps. The build process for the Experience App used that single key.

Apple now supports two types of API keys: a team key that is used to manage access to
all of your apps or individual keys that support separate access to each app. The team
key corresponds to the previously-supported single key.

The build process for the iOS version of the Experience App has been updated to support
both options. See the updated documentation:

- Set up the API key - Procedures for creating either a team key or individual key.

e Build the iOS app - Updated procedure with instructions for building the app using
either a team key or individual key.

This release fixes two issues with the Experience App, described in PD0021228 and
PD0021898 in the Ellucian Customer Center.

<!-- page 46 -->

#### Entra ID logout

#### Updates

#### Experience SDK 7.16.0

#### Upgrade to Ellucian Path Design System v7.18.1 and ds-icons v4.14.0

To provide these fixes to your users, rebuild the Experience App using the instructions in
(New app) Build the Android app and Build the iOS app.

Ellucian Experience can use Microsoft Entra ID (formerly Azure AD) as the identity
provider. Previously, in Entra ID implementations, attempting to log out of Experience
would lead to aMissing Authentication Token message. Logout now works
correctly: the user sees the expected Experience logout page and is logged out of both
Experience and Entra ID.

To implement this update, you will need to copy the Logout response URL value from the
Service Provider tab in Experience Setup and paste it into the Basic SAML Configuration
in Entra ID. See Step 6 of Define the basic SAML configuration in Entra ID.

This change addresses CR-000184172 in the Ellucian Customer Center.

For a list of the issues addressed in Experience 1.88 and subsequent patch releases, see
the Related Defects and Related Enhancements tabs on the following release pages in
the Ellucian Customer Center:

e Release page for Experience 1.88

e Release page for Experience 1.88.1

e Release page for Experience 1.88.2

SDK 7.16.0 includes an upgrade to new versions of the Ellucian Path Design System and
ds-icons, and an upgraded version of Node js.

SDK 7.16.0 includes an upgrade to Ellucian Path™ Design System (Path) v7.18.1 and ds-
icons v4.14.0. Several props and design tokens are deprecated in Path 7.18.1, and will be
removed in a future Path release. The Ellucian Path Design System release notes lists the
deprecated items and identifies the supported props and design tokens that you should
replace them with. The release notes also describe other changes in Path 7.18.1.

For a summary of dependency versions for all versions of the SDK, see the spreadsheet
attached to Dependency bundles.

<!-- page 47 -->

#### Upgrade to Node.js 20.18.1

#### Upgrading your extensions

### Experience 1.87.1

Upgrade to Nodes 20.18.1

Extensions created with SDK 7.14.0 or later require Node.js 20.18.1. To upgrade the
Node.js version:

e Install Node.js 20.18.1 as described in Install Node,js.

e When you upgrade an extension to the latest SDK version using the procedure in
Upgrade to the latest SDK 7.x version, delete the package- lock. json file and the
node_modules directory before running npm install.

Note: Due to an oversight, the documentation for SDK 7.14.0 and SDK 7.15.0 did not
describe the upgrade to Nodejs 20.18.1. If you created extensions with those SDK
versions, or upgraded to those versions, using Node.js 18.16.1, the extensions will
work. There is no need to upgrade to Node.js 20.18.1 until you are ready to upgrade
the extension to a later SDK version.

To upgrade an existing extension to SDK 7.16.0, use the procedure in Upgrade to the
latest SDK 7.x version.

Experience 1.87.1 supports builds of the Experience mobile application using the latest
iOS SDK.

Beginning April 24, 2025, Apple requires that all iOS and iPadOS apps uploaded to Apple
App Store Connect or published to the Apple App Store must be built with iOS 18 SDK or
later. Experience 1.87.1 includes updates that support the iOS 18 SDK.

This means that any build of the Experience App that you publish to the Apple App Store
on or after April 24 must have been built from the Mobile Application tab in Experience
Setup after the release of Experience 1.87.1 on April 18, 2025.

Existing published apps built with earlier versions of Experience will continue to work
after April 24. This requirement affects only apps that are submitted or published after
April 24.

This is an update to the Experience Mobile build service. The Experience application (the
dashboard) and Experience Setup have not been updated, and the version displayed on
both of those applications remains 1.87.0.

<!-- page 48 -->

### Experience 1.87 and Experience SDK 7.15.0

#### Experience 1.87

#### Improved card display on user dashboards

#### Experience header items open in a drawer

Experience 1.87 provides a new tab bar below the Experience header in Test
environments and other enhancements and updates.

Note: This enhancement is being released to Experience Test environments with
Experience 1.87, and is scheduled for release to Experience Production
environments with Experience 1.88.

The display of cards on user dashboards has been made more intuitive by the addition of
a tab bar below the header, and other related user interface changes. For details, see
mproved card display on user dashboards.

ELOYCE

UNIVERSITY

=&

Tab bar qm Home ' Reporting : 2 view att canoe

Athletics Class Schedule Mental Health Resources n Progress Towards Grants n

re Valey women's March 2025 . iim)

Note: This enhancement is being released to Experience Test environments with
Experience 1.87, and is scheduled for release to Experience Production
environments with Experience 1.88.

tems in the Experience header now all open in a drawer that opens from the right side of
the browser window. The Tasks/Calendar item previously opened in a drawer, and with
his release the Notifications, Applications, and Profile also open in a drawer, as shown in
the example below for the Profile.

<!-- page 49 -->

#### Instructional delivery method displayed in Classes and Class Schedule cards

#### (Banner)

c Catherine Anne Murphy

@ View Profile

(©) My Account

- Sign out

The Classes and Class Schedule cards can now display the instructional delivery method
from Banner:

- For the Classes card, the instructional delivery method is displayed on the card and on
both the term view and class detail view of the Experience page that is accessed from
the card.

e For the Class Schedule card, the instructional delivery method is displayed on the
class detail view of the card.

The value displayed is the description from the instructional delivery method codes that
you define on the GTVINSM page and assign to course sections on the SSASECT page in
Banner. In the example screen shots below, the value is "Traditional."

To take advantage of this feature, do the following:

e Install Banner Ethos API 9.37 or later. Banner Student API 9.37 includes changes to the
section-schedule-information API that support this enhancement.

e In Ethos Integration, ensure that the Ethos application for the Banner Student API
owns the section-schedule-information resource.

e Ensure that the Banner user account for proxy API requests (the user account whose
credentials are entered in the Ethos application for Experience) has Read permissions
on section-schedule-information (APILSECTION_SCH_INFORMATION security
object).

e Inthe Classes or Class Schedule card configuration, enable the Enable improved

<!-- page 50 -->

#### Classes page navigation enhancement

#### Updates

performance (requires Banner API 9.34.1+) toggle switch.

This change addresses IDEA0001728 in the Ellucian Customer Center.

Classes card Class Schedule card

Classes | < MATH 101-1: Mathematics 101 :

Last
i

a Credits: 3
ITAL 100 Elementary Italian
Meeting information
Mon/Wed ston Mon/Wed/Fri, 9:00 AM-9:50 AM

: - Dec 31, 2025 —— > Traditional, Mathematics Hall 103
Jan 1, 2020 - Dec 31, 2025

Jan 1, 2

MATH 101 Mathematics 101

Instructors
Mon/Wed/Fri 9:00 AM - 9:50 AM

qq Traditional, Mathematics Hall 103 James Johnson
Jan 1, 2020 - Dec 31, 2025 jamesjohnson@university.edu
PSYC 101 Intro to General Psychology William Clark
Tue/Thu 1:00 PM - 1:50 PM 7

Clicking a class title in the Classes card leads to the class detail view of the Classes page.
On the upper left of that page, next to the class title, is a link to the term view of the
Classes page. That link was previously a back arrow < which could be confusing because
it implied a return to the Classes card on the Experience dashboard. The back arrow has
been replaced with a CLASSES link as shown in the screen shot below. The navigation is
unchanged; clicking the link leads to the term view of the Classes page.

Classes

€ CLASSES COMP 101 Intro to Computer Science Pt 2

-uu PM - 3:20 PM, Lester B. Pearson Hall 122
Aug 1, 2020 - Dec 31, 2025

For a list of the issues addressed in Experience 1.87, see the Related Defects and Related
Enhancements tabs on the release page for Experience 1.87 in the Ellucian Customer
Center.

<!-- page 51 -->

#### Tab bar on the dashboard

Improved card display on user dashboards

The display of cards on user dashboards has been made more intuitive by the addition of
a tab bar below the header and other related user interface changes.

Note: This enhancement is being released to Experience Test environments with
Experience 1.87, and is scheduled for release to Experience Production
environments with Experience 1.88.

The dashboard now has a new tab bar, situated below the header and above the cards,
that provides users with intuitive access to several views of available cards. The table
below provides a brief description of each item on the tab bar. For a detailed description,
see End user views of cards.

This enhancement addresses IDEA0002171, IDEA-72114, and IDEA-72392 in the Ellucian
Customer Center.

Item on the tab bar Description

Home tab The Home tab enables users to navigate from a category
ab back to the home page. The cards displayed on the
user's home page are unchanged - these are cards locked
on the home page by administrators and cards saved by

he user.
Category tabs (such as These tabs display the same cards, in the same order, as
Academics in the screen on the category pages accessed from the Experience
shot below) main menu. Users can now access the category page

from either the dashboard tab or the main menu. On both
he tab bar and main menu, users see only the categories
hat include cards available to them based on their roles.
The only difference between these views is that the
category pages accessed from the main menu provide
search and sort features that are not on the category tabs.

VIEW ALL CARDS link This link provides access to the All Cards page, previously
called the Discover page. This link replaces the DISCOVER
MORE link that was located at the bottom of the
dashboard. It has been moved to the tab bar for better
visibility.

<!-- page 52 -->

#### Related user interface changes

#### Documentation

#### Experience SDK 7.15.0

#### Upgrade to Ellucian Path Design System v7.17.0 and ds-icons v4.13.0

= fe ELOYCE
= & universiry

Tab bar ae ore ; VIEW ALL CARDS

Athletics Class Schedule Mental Health Resources a Progress Towards Grants a

March 2025 » mi}
Irvine Valley women's March 202 *
SCOUT © Was

With the addition of the tab bar come other user interface changes:

- Cards no longer overlap with the header. Cards are in the space below the header and
tab bar.

e Announcements no longer overlap with the header, but instead are fully within the
header.

e If auser has no announcements, the height of the header is now smaller to provide
more usable space for cards.

The Experience documentation reflects the updated user interface. For example, the
documentation refers to the "All Cards" page rather than the "Discover" page to reflect the
renaming of that page. The documentation currently matches the Test environment, and
will match the Production environment when these enhancements are released to
Production.

SDK 7.15.0 includes an upgrade to new versions of the Ellucian Path Design System and
ds-icons.

SDK 7.15.0 includes an upgrade to Ellucian Path™ Design System (Path) v7.17.0 and ds-
icons v4.13.0. For details on the enhancements in Path 7.17.0, see the Ellucian Path
Design System release notes.

For a summary of dependency versions for all versions of the SDK, see the spreadsheet
attached to Dependency bundles.

<!-- page 53 -->

#### Upgrading your extensions

### Experience 1.86

#### Users can dismiss Experience notifications from ERP holds

#### Improved display of academic details in the user profile

To upgrade an existing extension to SDK 7.15.0, use the procedure in Upgrade to the
latest SDK 7.x version.

Experience 1.86 provides enhancements to ERP hold notifications and the display of
academic details on the user profile page.

With this release, Experience users can dismiss notifications generated from ERP holds.
The ability to dismiss notifications was previously available for other notification types,
and is now also available for ERP hold notifications.

This enhancement depends on a defect resolution provided with Experience 1.84.1 on
February 7, 2025. ERP hold notifications created before that date are not dismissable.

Notifications x

Hold
Academic hold -- Confirm Enrollment
Spring. Diss

2 Gays ago

The Academic Details section of the Experience user profile page displays information
about each of a user's academic programs, including information about majors, minors,
and concentrations. The display of that information has been improved:

e If auser has multiple academic programs, each program is now on a separate tab
rather than a separate space on the user profile page.

- In previous releases, majors, minors, and concentrations were all listed together under
Majors. They are now listed separately with the appropriate label.

<!-- page 54 -->

#### Updates

### Experience 1.85 and Experience SDK 7.14.0

#### Experience 1.85

#### Data card templates - Big Number and Progress

This change addresses Product Defect PD0018163 in the Ellucian Customer Center.

Academic Details

_ BA in Anthropology Bachelor of Music
LEVEL Undergraduate DIVISION College of Arts & Sciences
CAMPUS Main CATALOG YEAR Spring 2020 EEE

Anthropology & Sociology CONCENTRATION Anthropology & Sociology

Spanish

For a list of the issues addressed in Experience 1.86 and subsequent patch releases, see
the Related Defects and Related Enhancements tabs on the following release pages in
the Ellucian Customer Center:

e Release page for Experience 1.86

e Release page for Experience 1.86.1

Experience 1.85 provides two new data card templates.

This release introduces data card templates, which provide a framework from which you
can create your own cards that use common data presentations. Data card templates are
available with Experience Premium. Data card templates use an API to get the data
needed to populate the card and use the API Selector to select that API when creating the
card.

This release includes two templates:

<!-- page 55 -->

#### Ellucian Forms is generally available

#### Updates

#### Experience SDK 7.14.0

#### Upgrade to Ellucian Path Design System v7.16.0 and ds-icons v4.12.1

Template Description

Big Number Create a card that displays a single number, with an optional
external link that provides more information.

Progress Create a card that displays a graphical representation of progress
toward a target value, such as a fundraising goal or credits
towards a minor.

For the procedures for creating a Big Number card or Progress card, see Data card
emplates.

Ellucian recently released Ellucian Forms, which you can use to collect data with a no-
code drag-and-drop form builder that integrates with other Ellucian Platform products.
Ellucian Forms is available with an Intelligent Processes Workflow Automation License.
For details, see the Ellucian Forms documentation.

For a list of the issues addressed in Experience 1.85 and subsequent patch releases, see
the Related Defects and Related Enhancements tabs on the following release pages in
the Ellucian Customer Center:

e Release page for Experience 1.85

e Release page for Experience 1.85.1

SDK 7.14.0 includes an upgrade to new versions of the Ellucian Path Design System and
ds-icons.

SDK 7.14.0 includes an upgrade to Ellucian Path™ Design System (Path) v7.16.0 and ds-
icons v4.12.1. For details on the enhancements in Path 7.16.0, see the Ellucian Path
Design System release notes.

For a summary of dependency versions for all versions of the SDK, see the spreadsheet
attached to Dependency bundles.

<!-- page 56 -->

#### Upgrading your extensions

### Experience 1.84

#### ERP Advisor card displays advisors for future terms

#### Experience mobile app supports Android 15

#### General availability of Anonymous Grading for Banner

To upgrade an existing extension to SDK 7.14.0, use the procedure in Upgrade to the
latest SDK 7.x version.

Experience 1.84 provides an enhancement to the ERP Advisor card, support for Android
15 in the Experience App, and other updates.

The ERP Advisor card previously displayed a student's advisors for the current term. The
card now also displays advisors for future terms, ensuring that students can see their
advisors for an upcoming term in the card. This enhancement addresses IDEA0001313 in
the Ellucian Customer Center.

Note:Colleague Web API 2.5.0 or later is required to support the display of advisors
for future terms in the ERP Advisor card.

The Experience App has been upgraded to support Android 15. The App now supports
Android 9 through 15.

To provide this enhancement to your users, rebuild the Android version of the Experience
App using the instructions in (New app) Build the Android app.

Ellucian announces the release of Anonymous Grading, which supports grade entry in
Banner by anonymous ID rather than student name to avoid potential bias in the grading
process. Anonymous Grading is available with Experience Premium.

Administrators access the configuration page for Anonymous Grading from the
Experience Application menu. Faculty access Anonymous Grading from the Faculty
Grading card, which provides a list of a faculty member's current courses with a link to
the grading page for each course. The card supports two types of courses:

<!-- page 57 -->

#### Updates

### Experience 1.83

#### Experience App supports landscape mode (rebuild required)

Course type Description

Anonymous grading | These are courses for which the grade entry page identifies
students by an anonymous ID rather than the student's name.
Clicking the course link in the card opens a grade entry page for
that course in Experience.

Non-anonymous These are courses for which the grade entry page identifies
grading students by name. This is the typical grading for most courses,
and many institutions will have only non-anonymous grading
courses. Clicking the course link opens a Banner grade entry page
for that course.

Because the Faculty Grading card supports non-anonymous grading courses, it is useful
even for institutions that don't require the anonymous grading features but want to have a
grading card for their faculty.

Use the appropriate procedures for your implementation:

- If your implementation includes both anonymous and non-anonymous grading
courses, use the procedures in Ellucian Anonymous Grading.

- If your implementation includes only non-anonymous grading courses, use the
procedures in Faculty Grading card (Banner).

For a list of the issues addressed in Experience 1.84 and subsequent patch releases, see
the Related Defects and Related Enhancements tabs on the following release pages in
the Ellucian Customer Center:

e Release page for Experience 1.84

a

e Release page for Experience 1.84.

Experience 1.83 provides support for landscape mode for the Experience App and
clarification of Experience data tracking.

The Experience App can now be viewed in landscape mode. Support for landscape mode
on iPads was introduced in an earlier Experience release, and this release adds landscape
support for iPhones and Android devices. This enhancement addresses IDEA-72293 in

<!-- page 58 -->

#### Clarified data tracking information

#### New Experience cards for Human Capital Management

#### Updates

the Ellucian Customer Center.

To provide this enhancement to your users, rebuild the Experience App using the
instructions in (New app) Build the Android app and Build the iOS app.

Ellucian Experience users can choose whether to allow the use of non-essential cookies
and third-party analytics to improve Ellucian Experience. That choice is presented in the
Enhance Your Experience dialog when the user first accesses Experience, and the user
can change that decision later from the user profile.

The description of that data tracking has been updated in both the initial dialog and the
user profile to better describe the benefits to both that user and all Experience users of
permitting data to be tracked. The initial dialog also includes a link to the new What is
tracked in Experience page in this documentation, which provides details on how
Experience measures and uses data.

Ellucian recently released new Experience cards for Human Capital Management (HCM).
The HCM cards enable employees to access personal and job related information. The
cards are described in Human Capital Management cards, and procedures for setting up
those cards in Experience are in Set up the Human Capital Management Cards.

This release addresses an issue that prevented Experience users from getting
notifications for ERP holds. This update addresses Product Defect PD0010965.

For a list of all of the issues addressed in Experience 1.83, see the Related Defects and
Related Enhancements tabs on the release page for Experience 1.83 in the Ellucian
Customer Center.

<!-- page 59 -->

## Configure Ellucian Experience

## High-level procedure for implementing Experience

#### Find Experience Setup within the Customer Center

#### Configure single sign-on within Experience Setup

These are the high-level steps for a basic implementation of Ellucian Experience.

To configure Ellucian Experience, you need access to the Experience Setup (Test) and
Experience Setup applications. You will see Experience Setup on the Tools tab in the
Customer Center if you have enabled Ethos. If you do not see Experience Setup or
Integration, request access to both through csenablement@ellucian.com.

Prerequisites:

e You must have access to the Ellucian Customer Center.

e Configure Ethos Integration to support Banner or Colleague transactions.
Resources:

e VIDEO - Getting Started with Experience

- DOC - Ellucian Experience Documentation

To grant users access to Ellucian Experience, you need to configure single sign-on within
Experience Setup. To accomplish this step, you must have access to your institution's
identity provider.

Prerequisites:

- Your institution must possess a SAML 2.0 compliant identity provider.

e You

ead

institution must open your firewall for the Experience IPs.
- Define identity provider claims for ERP ID, Roles, and User ID.

Resources:

e VIDEO - Configure Single Sign-On

e DOC - Set up Ellucian Experience with an identity provider

<!-- page 60 -->

#### Connect Experience to Ethos Integration

#### Specify Roles and Permissions

<!-- page 61 -->

#### Access the Experience Dashboard

## About Experience configuration

### Experience architecture

#### Configuration for user access to Experience

<!-- page 62 -->

#### Data requests from Experience to ERPs and other Ellucian solutions

Banner

Banner Ethos API

Colleague <—__ Colleague Ethos API

PowerCampus «—_—_| PowerCampus Ethos API

non-ERP solution }¢———|

Ethos API

Ethos

Integration

Experience

|

Identity
provider

Experience gets data from ERPs and other Ellucian solutions to display in Experience
cards and other content. Experience gets some data through Ethos API requests through
Ethos Integration, some through GraphQL requests to Data Access, and some through
direct requests to the Ellucian solution. The diagram below shows examples of the data

requests.
Experience
GraphQL
|
Data Access es intewston l<—feauests _|
s
& Banner Search card/page
2
=
5
g
3
z=
Banner }e——{__BannerEthosAP! Je — Ethos API
requests
Colleague Colleague Ethos API inteoration 4
PowerCampus }— PowerCampus Ethos API je

Ellucian Workflow kk

Degree Works

Direct data requests

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 63 -->

### Experience prerequisites

To implement Ellucian Experience, you need to set up other Ellucian solutions and third-
party solutions that provide Experience content or support the integration of those
solutions with Experience.

<!-- page 64 -->

Prerequisite Comments Reference

Identity
provider

Ellucian Experience requires a SAML 2.0-
compliant identity provider for
authentication and authorization for
Ellucian Experience users. Ellucian
xperience has been tested with AD FS,
ra ID, Ellucian Ethos Identity, and
bboleth.

a 5

Set up Ellucian Experience
with an identity provider

Person
source

xperience must be connected to an
lucian ERP (Banner, Colleague, or
PowerCampus) or other Ellucian solution
(such as CRM Advance) that provides
person information using the Ethos
persons data model.
S)
E

Experience integration with
Ellucian solutions

Ethos
Integration

Experience connects to an integrated
solution (an ERP or other source of person
information) through Ethos Integration,
using Ethos APIs specific to that solution.

Connect the integrated
solution to Ethos Integration

Ellucian ERP

n most Experience implementations,
Experience displays content from an
Ellucian ERP (Banner, Colleague, or
PowerCampus). Experience connects to
he ERP through Ethos Integration, using
Ethos APIs specific to that ERP.

See Connect the integrated
solution to Ethos Integration
for the minimum Ethos API
versions for each ERP.

Data Access
(optional)

Some Experience content uses GraphQL
requests to Data Access to get the required
data. For example:

e The Housing Request card gets data
from Data Access. To use the Housing
Request card, you need to load the
appropriate housing-related Banner or
Colleague data into Data Access.

e¢ Some of the CRM Advise cards get data
from Data Access. To use those CRM
Advise cards, you need to load the
appropriate CRM Advise data into Data
Access.

Set up GraphQL requests to
Data Access

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 65 -->

### Experience integration with Ellucian solutions

#### Experience with an ERP

#### Experience without an ERP

Ellucian Experience is always connected through Ethos Integration with an Ellucian ERP
or other Ellucian solution. At a minimum, you must integrate Experience with at least one
Ellucian solution that provides person information using the Ethos persons data model.

Many Ellucian Experience implementations integrate Experience with an Ellucian ERP -
Banner, Colleague, or PowerCampus. These implementations provide Experience/ERP
integration features such as academic details on the Profile page, the use of Ethos roles,
and ERP holds displayed as notifications in Experience.

Some implementations integrate Experience with a non-ERP Ellucian solution to provide a
limited feature set, such as access to Experience cards supporting that solution. For
example:

- Integration with Quercus provides administrators with access to the Data Connect
Packages card, which they use to access Data Connect integrations such as the DfE
and HESA Data Futures integrations.

Note: Although Quercus is an ERP, the Quercus integration with Experience is not
intended to provide the Experience/ERP integration features.

ntegration with CRM Engage provides development officers with access to the
Constituents card and the Contact Reports card.

Non-ERP implementations require performing only some of the configuration steps in this
Experience documentation.

Note: Although an Experience implementation might be intended to provide only
imited features, all Experience features for the licensed tier (Foundation or
Premium) are visible. For example, even if an implementation is intended only to
provide access to selected cards, it displays standard Experience features such as
he profile page, delivered cards and card templates in the Card Management table,
notifications, and announcements. However, these features might not work as
intended (for example, the profile page might be blank).

<!-- page 66 -->

#### Experience integration with multiple person sources

### Experience instances and Ethos environments

#### Overview

#### Select your Experience/Ethos combination in Experience Setup

You can integrate Experience with multiple sources of person information, such as both
Banner and CRM Advance. For these implementations, you set up your identity provider
with person claims for both solutions. Experience searches both solutions, in the order
you specify, when searching for a particular person. Each person source must be
configured with Ellucian Person Manager.

An Ellucian Experience site is connected to an Ellucian Ethos environment for retrieval of
data from your ERP through Ethos Integration, and for other integrations.

Both Experience and Ethos have test and production selections:

e Experience: Each release of Experience is initially released to test instances and then, a
ew days later, to production instances. During the period between those releases, Test

is one release ahead of Production. Except for that brief period, Test and Production
have the same features.

e Ethos: The basic configuration for each customer is an Ethos tenant with two
environments, Test and Production. You might have also obtained additional
environments, such as a Development or Training environment.

In a multi-institution implementation, there are additional Ethos tenants for each
institution within the system, as described in Multi-institution Experience.

Experience Production is always connected to Ethos Production.

Experience Test can be connected to Ethos Test or to any other non-Production Ethos
environment you have licensed from Ellucian.

1. In the Ellucian Customer Center, click Tools, and then select the desired Experience
Setup instance:

- Click Experience Setup (Test) to access the Test instance of Experience Setup.
- Click Experience Setup to access the Production instance of Experience Setup.

2. (If applicable) In Experience Setup, in the Environments drop-down, select the desired

<!-- page 67 -->

#### Identify your current Experience/Ethos combination in Experience Setup

#### Identify your current Experience/Ethos combination in Experience

Ethos environment. The option to select an environment is available only if multiple
Ethos environments are associated with this Experience Setup instance. For example:

- This is a multi-institution implementation of Experience.

e You accessed the Test instance of Experience Setup, and you have licensed Ethos
non-Production environments in addition to the basic Test environment. For
example, you might have licensed a Development environment.

In Ellucian Experience Setup, the URL in the address bar indicates the Experience
instance:

- experiencesetup-test.elluciancloud.com indicates the Test instance of
Experience Setup.

- experiencesetup.elluciancloud.com indicates the Production instance of
Experience Setup.

Note: The .com domain is for the U.S. region. If you are in another region, see
Experience domains and IP addresses.

The Ethos environment (for example, Test or Production) is identified next to the
Environments drop-down.

In the Ellucian Experience site (the dashboard), the URL in the address bar identifies both
the Experience instance and the Ethos environment.

The domain in the URL identifies the Experience instance:
- experience-test.elluciancloud.com indicates the Test instance of Experience.

- experience. elluciancloud.com indicates the Production instance of Experience.

Note: The .com domain is for the U.S. region. If you are in another region, see
Experience domains and IP addresses.

The Ethos environment is identified by the next part of the URL, which is the alias
assigned by Ellucian to that Ethos environment. To determine the alias that corresponds
to an Ethos environment, go to Ethos Integration and then click the gear icon in the
header bar.

<!-- page 68 -->

### Multi-institution Experience

#### Benefits of the multi-institution feature set

#### Dashboards

Multi-institution systems that share an ERP and use the same identity provider instance
can use the optimized multi-institution features of Ellucian Experience.

The multi-institution feature set of Experience is available with additional licensing for
Experience Premium customers. See your Ellucian Sales team contact for details.

Note: Systems that include multiple institutions, but have a separate ERP
implementation for each institution, would use the basic implementation of Ellucian
Experience. Each institution would have its own Experience Setup environment and
dashboard.

The multi-institution feature set in Experience allows the deployment of a single data
infrastructure to multiple institutions, providing a unified and centralized way to manage
information. Benefits include:

- Centralized system administration from a single Experience Setup site.

- The ability to define identity provider setup for all institutions at the system level. No
institution-specific identity provider setup is required.

- The ability to define roles and permissions at the system level, available when
configuring content at all institutions; or at the institution level, available only for that
institution.

A multi-institution implementation includes multiple Experience dashboards:
e A dashboard for each institution in the system.

e A dashboard at the system level. For example, users who manage system-wide
functions (such as payroll) through Experience might start from a payroll card on the
system-level dashboard.

Users who are affiliated with multiple institutions within your system need access to
multiple dashboards. Those users can easily view another dashboard by selecting it from
a drop-down list under the user profile avatar, which opens the new dashboard in a
separate browser tab. The user can simultaneously view the dashboards for multiple
institutions in separate browser tabs or windows.

<!-- page 69 -->

#### Ethos tenants

The basic configuration for Ellucian Ethos is one Ethos tenant with two environments,
Test and Production. This configuration is used for single-institution implementations,
and for multi-institution implementations that do not include Ellucian Experience. See
Experience instances and Ethos environments for a detailed description of this basic
configuration. Example of the tenants in this configuration:

e My College: Test

e My College: Production

Note: In addition to Test and Production, you can obtain additional environments,
such as Development or Training. These examples show only Test and Production.

For a multi-institution implementation that includes Ellucian Experience, there is a system
enant at the top level and an institution tenant for each institution (campus). Each of
hose tenants has a Test and Production environment. Example of the tenants for a
system with three institutions (Main Campus, North Campus, and South Campus):

e My College: Test

e My College: Production

e My College Main: Test

e My College Main: Production
e My College North: Test

e My College North: Production

e My College South: Test

e My College South: Production

As you configure Ellucian Experience, you select the correct Ethos tenant for each
procedure as shown in the table below. The documentation guides you in selecting the
appropriate tenant for each procedure.

<!-- page 70 -->

#### Administrators

#### Documentation

Type of Description

configuration

Ethos Integration All setup in Ethos Integration, such as creating Ethos applications,
is done within a single tenant. Typically, you would use the
system tenant for this configuration.

Identity provider dentity provider setup in Experience Setup is done within the
system tenant. If you navigate within Experience Setup to one of
he institution tenants, you can view, but not modify, the identity
provider setup defined at the system level.

Roles and You can define roles and permissions from either the system
permissions enant or the institution tenant. Roles and permissions defined
from the system tenant apply at the system level and also apply
- all institutions in the system.

Dashboard setup Dashboard setup within the Configuration area of Ellucian
Experience is done from the specific institution-level or system-
evel Experience site.

Ellucian Experience includes two kinds of administration:

e Basic configuration is performed in Ellucian Experience Setup. Access to Experience
Setup requires that Ellucian provide people in your organization with access to a
tenant. You could choose, for example, to provide some administrators access to all
tenants at the system and institution levels, and other administrators access only to
individual institution tenants. See Request access to child tenants for information
about how to request that Ellucian set up access to particular tenants.

e Content configuration is performed from the Configuration area of the Experience
dashboard. You will grant content administrators access to the Configuration area of
the Experience dashboard from Experience Setup, as described in Grant Experience
dashboard configuration permissions.

The Experience configuration documentation includes procedures for setting up
Experience with Banner Multi-Entity Processing (MEP) to take advantage of the multi-
institution features of Experience.

<!-- page 71 -->

#### Request access to child tenants

#### Request access to all child tenants in your system

#### Request access to only some child tenants in your system

Use the instructions below to request that Ellucian provide administrative access to the
institution-level tenants in an Experience multi-institution implementation. These
instructions assume that administrators already have access to the system-level tenant.

Use the appropriate version below depending on whether you want access to all or only
some child tenants.

For a description of tenants in an Experience multi-institution configuration, see Multi-
institution Experience.

From the Ellucian Customer Center, create a case with the information listed below.

Field on the Create a Case ___ Entry

form

Product Line Customer Success

Product Name Customer Center

Short Description Admin Access for Experience Setup (multi-institution)
Description Please provide me with access to production and test

enant environments for all child institutions so that | can
see all institutions within Experience Setup.

Parent Organization Name: <Enter the name of your
system>

Point-of contact: <Enter the name and organization role of
he contact>

From the Ellucian Customer Center, create a case with the information listed below.

<!-- page 72 -->

### Experience domains and IP addresses

Field on the Create a Case ___ Entry

form

Product Line Customer Success

Product Name Customer Center

Short Description Admin Access for Experience Setup (multi-institution)
Description Please provide me with access to production and test

tenant environments for the specific institutions listed
below so that | can see a specific set of institutions within
Experience Setup.

Parent Organization Name: <Enter the name of your
system>

Child Organization Names: <Enter the list of institutions
within your system for which you want tenant
environments.>

Point-of contact: <Enter the name and organization role of
the contact>

Some procedures require that you specify the domain or IP addresses for Ellucian
Experience in the Ellucian cloud. Use the domain and IP addresses for your region.

<!-- page 73 -->

Region Domain IP Addresses
US. Experience dashboard: Test:
e Test: experience- e 3.226.114.59
test.elluciancloud.com
- 3.225.23.59
- Production:
experience.elluciancloud.com Production
Experience Setup: ° 3.213.247.37
e Test: experiencesetup- © 3.221.108.177
test.elluciancloud.com ° 23.23.100.94
- Production: © 44.217.150.118
experiencesetup.elluciancloud.co
m
Canada Experience dashboard: Test:
e Test: experience- e 99.79.187.65
test.elluciancloud.ca
- 15.223.105.88
- Production:
experience.elluciancloud.ca Production
Experience Setup: * 15.223.17.196
- Test: experiencesetup- ° 15.222.190.184
test.elluciancloud.ca
- Production:
experiencesetup.elluciancloud.ca
Europe Experience dashboard:

e Test: experience-
test.elluciancloud.ie

e Production:
experience.elluciancloud.ie

Experience Setup:

e Test: experiencesetup-
test.elluciancloud.ie

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 74 -->

## Connect the integrated solution to Ethos Integration

; Test:
e Production:

experiencesetup.elluciancloud.ie| . 18 903.7897
- 54.73.251.250
Production:

- 63.32.24.178

e $4.217.225.179

Asia-Pacific | Experience dashboard: Test:

e Test: experience- © 3.24.187.15

test.elluciancloud.com.au
- 13.54.67.130

e Production:
experience.elluciancloud.com.au | Production:

Experience Setup: * 52.63.247.216

e Test: experiencesetup- * 52.62.40.165
test.elluciancloud.com.au

- Production:
experiencesetup.elluciancloud.co
m.au

Ellucian Experience is connected through Ethos Integration with an integrated solution: an
ERP (Banner, Colleague, or PowerCampus) or other Ellucian solution.

See the table below for links to the procedures for setting up the integrated solutions in
Ethos Integration.

Note: You will need to set up the integrated solution in Ethos Integration to support
proxy API requests. Ethos Integration also supports publish/subscribe, but Ellucian
Experience does not use it.

<!-- page 75 -->

solution

e to find the procedures

Banner See Connect Banner to Ethos Integration.
Experience requires Banner Ethos API 9.25 or later to implement most
Experience features. Some recently-released features require a later
version:
e Banner Ethos API 9.34.1 or later to take advantage of performance
improvements in the Classes card and Class Schedule card.
e Banner Ethos API 9.37 or later to display the instructional delivery
method in the Classes card and Class Schedule card.
Colleague See Connect Colleague to Ethos Integration.
Experience requires Colleague Web API 2.1.1 or later to implement
most Experience features. Some recently-released features require a
later version:
- Colleague Web API 2.5.0 or later to display advisors for future
terms in the ERP Advisor card.
- Colleague Web API 2.7 or later to take advantage of performance
improvements, and to display the instructional method, in the
Classes card and Class Schedule card.
- Colleague Web API 2.8 or later to be able to specify that final
grades will be displayed in the Classes card and page only if the
grade is verified.
PowerCampus__| See Connect PowerCampus to Ethos Integration.

For the versions of the PowerCampus Ethos API that are certified with
Ellucian Experience, see the PowerCampus Compatibility Report,
available as an attachment from the PowerCampus Documentation

page.

CRM Advance

See the CRM Engage setup documentation for procedures for setting

with CRM up CRM Engage with Experience, including Ethos setup.
Engage
Quercus See Connect Quercus to Ethos and Experience for procedures for

setting up Quercus with Experience, including Ethos setup.

<!-- page 76 -->

## Connect Ellucian Experience to Ethos Integration

### Create a user for proxy API requests

#### About this task

#### Procedure

Set up Ellucian Experience with Ellucian Ethos Integration to support messaging between
Ellucian Experience and other applications.

For a Banner MEP implementation, use the procedures in Connect Ellucian Experience to
Ethos Integration (Banner MEP) instead.

In the ERP or other solution you are integrating with Ellucian Experience, create a user to
support proxy API requests from Experience.

Ellucian Experience makes API requests to the integrated solution through Ethos
Integration. Each request includes the credentials for a user with permissions to access
the data. You will enter those user credentials in the Add Application wizard when you
create the Ethos application for Ellucian Experience.

1. Check that the integrated solution is set up in Ethos Integration as the owner of the
Ethos resources for which Ellucian Experience will make proxy API requests.

e For an ERP implementation, see Banner resources for API requests from Experience
and Colleague resources for API requests from Experience for a list of the resources
Ellucian Experience needs to access and the required permissions for each
resource.

Note: If you created the Banner or Colleague application in Ethos Integration
from the catalog, the required resources were automatically added when you
created the application.

e For other solutions, the required owned resources are identified in the
documentation for setting up that solution with Experience.

2. In the integrated solution, create a user with the required permissions.

<!-- page 77 -->

#### Banner resources for API requests from Experience

Integrated Where to find the procedures

soluti

Banner See Create and Authorize a Banner User to Enable Proxy API calls
for Ethos Integration.
For the Banner security objects associated with each resource, see
Banner resources for API requests from Experience.

Colleague See Create Colleague users for proxy API requests.
For the Colleague permissions associated with each resource, see
Colleague resources for API requests from Experience.

PowerCampus_ |See Create PowerCampus users for Proxy API requests.

CRM Advance | See the CRM Engage setup documentation for procedures for

with CRM setting up CRM Engage with Experience, including procedures for

Engage setting up credentials in both CRM Advance and the Person Service,
as needed, to support integration with Experience.

Quercus See Connect Quercus to Ethos and Experience for procedures for
setting up Quercus with Experience, including setting up credentials.

Ellucian Experience needs access to specific Ethos resources to support API requests to
Banner through Ethos Integration.

The table below lists the resources along with the Banner security objects that provide
access to those resources.

Experience.

Note: These are the resources used to retrieve user profile information and
information used in basic cards and card templates that surface ERP data. Some
Experience cards for other Ellucian solutions require additional resources. Those
requirements are with the documentation for setting up each Ellucian solution with

The security objects listed in the Banner Security Object column come from the API
Catalog. To determine the required security object for any API, go to the home page of the
Ellucian Documentation site, click API Catalog > Banner API Catalog, and then search for
the desired API. On the page for the API, expand the GET method. The security object is
displayed as the value of the x-method-permissions field at the bottom of the

<!-- page 78 -->

expanded section.

<!-- page 79 -->

Required
Resource Permissions Banner API Banner Security Object
academic- Read Student APILACADEMIC_CATALOGS
catalogs
academic- Read Student APILACADEMIC_CREDENTIALS
credentials
academic- Read Student APILACADEMIC_DISCIPLINES
disciplines
academic-levels | Read Student APILACADEMIC_LEVELS
academic- Read Student API_LACADEMIC_PERIODS
periods
academic- Read Student APILACADEMIC_PROGRAMS
programs
addresses Read Integration APILADDRESSES
advisor-types Read Student API_ADVISOR_TYPES
buildings Read Integration API_BUILDINGS
courses Read Student API_COURSES
course-title- Read Student API_COURSE_TITLE_TYPES
types
educational- Read Student APILEDU_INST_UNITS
institution-units
gender- Read Integration API_LGENDER_IDENTITIES
identities
grade- Read Student API_GRADE_DEFINITIONS
definitions
instructional- Read Student APILINSTRUCTIONAL_EVENTS
events
personal- Read Integration APILPERSONAL_PRONOUNS
pronouns
person-hold- Read Studen API_LPERSON_HOLD_TYPES
types
person-holds Read Studen API_LPERSON_HOLDS
persons Read Integration APILPERSONS
rooms Read Integration APILROOMS
sections Read Student API_SECTIONS

<!-- page 80 -->

#### Colleague resources for API requests from Experience

section-grade- |Read Student API_SECTION_GRADE_TYPES
types

section- Read Student API_SECTION_INSTRUCTORS
instructors

section- Read Student API_SECTION_REG_INFORMATIO
registration- N

information!

section- Read Student API_LSECTION_REGISTRATIONS
registrations

section- Read Student API_SECTION_SCH_INFORMATIO
schedule- N

information'

section-title- Read Student API_SECTION_TITLE_TYPES
types

sites Read Integration API_SITES

student- Read Student API_LSTUDENT_ACADEMIC_PROG
academic- RAMS

programs

student-advisor- | Read Student APILSTUDENT_ADVISOR_RELATN
relationships SHPS

student- Read Student APILSTUDENT_TRANSCRIPT_GRA
transcript- DES

grades

student- Read Student APILSTUDENT_UNVERIFIED_GRA
unverified- DES

grades

students Read Student APILSTUDENTS

subjects Read Student API_SUBJECTS

user-identity- Read Integration API_LUSER_IDENTITY_PROFILES

profiles

|The section-registration-information and section-schedule-information
improved performance in the Classes and Class Schedule cards, and

resources suppor
are available with Banner Ethos API 9.34.1 or later.

Ellucian Experience needs access to specific Ethos resources to support API requests to

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 81 -->

Colleague through Ethos Integration.

The table
access to those resources.

below lists the resources along with the Colleague permissions that provide

Experience.

Note: These are the resources used to retrieve user profile information and
information used in basic cards and card templates that surface ERP data. Some
Experience cards for other Ellucian solutions require additional resources. Those
requirements are with the documentation for setting up each Ellucian solution with

Documen

expanded section.

ote the following:

Some resources do not require that
permissions be assigned in Colleague to
support READ access. If a resource does
not have permissions listed in the
Colleague Permission column, then you do
not need to assign permissions for that
resource.

The permissions listed in the Colleague Permission column come from the AP
To determine the required permission for any API, go to the home page of the E

Catalog.
lucian

ation site, click API Catalog > Colleague API Catalog, and then search for the
desired API. On the page for the API, expand the GET method. The permission is
displayed as the value of the x-method-permissions field at the bottom of the

Colleague permission considerations Example

The Colleague proxy user can read
academic-catalogs information without
having permissions assigned.

If a resource has multiple permissions for
different access levels, the Colleague
Permission column includes only the
permission required for READ access.

The addresses resource requires the
VIEW.ADDRESS permission for READ
access, and the UPDATE.ADDRESS
permission for READ/UPDATE access. The
Colleague Permission column includes
only the VIEW.ADDRESS permission.

If a resource requires permissions for
CREATE/UPDATE, but not for READ, the
Colleague Permission column says that
no permissions are required.

The courses resource has only the
CREATE.UPDATE.COURSE permission for
CREATE/UPDATE access. The Colleague
Permission column says that no
permissions are required, because
Experience requires only READ access.

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 82 -->

Required

Resource Permissions Colleague Permission

academic-catalogs |Read

academic- Read
credentials

academic-disciplines | Read

academic-levels Read

academic-periods Read

academic-programs | Read

addresses Read VIEW.ADDRESS
advisor-types Read
buildings Read
courses Read
course-title-types Read
educational- Read

institution-units

gender-identities Read

grade-definitions Read

instructional-events | Read

personal-pronouns' |Read

person-hold-types Read

person-holds Read VIEW.PERSON.HOLD
persons Read VIEW.ANY.PERSON
rooms Read

sections Read

section-grade-types |Read
section-instructors |Read VIEW.SECTION.INSTRUCTORS

section-registration- |Read

. . 1
information

section-registrations | Read VIEW.REGISTRATIONS

section-schedule- Read

. . 1
information

<!-- page 83 -->

### Create an application in Ethos Integration for Ellucian

### Experience

#### Before you begin

#### About this task

section-title-types Read

sites Read

student-academic- |Read VIEW.STUDENT.ACADEMIC.PROGRAM
programs

student-advisor- Read VIEW.STU.ADV.RELATIONSHIPS
relationships

student-transcript- | Read VIEW.STUDENT. TRANSCRIPT.GRADES
grades

student-unverified- | Read VIEW.STUDENT.UNVERIFIED.GRADES
grades

students Read VIEW.STUDENT.INFORMATION

subjects Read

user-identity-profiles |Read VIEW.ANY.PERSO

|The section-registration-information and section-schedule-information
resources support improved performance, and display of the instructional method, in the
Classes and Class Schedule cards. The required versions of those resources are available

with Colleague Web API 2.7 or later.

The application record contains basic information about Ellucian Experience and how it
interacts with other applications through Ethos Integration.

The Add Application wizard will prompt you for information about proxy API requests.
Before running the wizard, create a user in your ERP or other integrated solution for
authentication of proxy API requests. See Create a user for proxy API requests.

Some integrated solutions, listed below, have specific procedures for creating the Ethos
application for Experience. Use those procedures instead of this one.

- For CRM Engage, see the procedure for creating an application for Experience to
support CRM Engage.

- For Quercus, see the procedure for creating an application for Experience to support
Quercus.

<!-- page 84 -->

#### Procedure

1. On the Ethos Integration header bar, click the gear icon & and then select the Ethos
environment where you want to perform this procedure.

2. On the Ethos Integration header bar, click Applications.
3. In the Create New App area of the page, click Manually.
4. In the Add Application dialog box, do the following:

a. Select Configure REST API proxy.

b. Click Continue.

5. On the Application Details page of the wizard, enter the information described below
and then click Next.

Field

Application name Enter a unique name for

his application.
Example name: Ellucian Experience

ake sure the name uniquely identifies this application.
When you need to select an application elsewhere in the
Ethos Integration user interface, you will use the name

o select the correct application.

Description (Optional) Enter a description of this application.

6. On the Add Source Applications page of the wizard, set up proxy API requests:
a. Click Add Source Application to open the Add Source Application dialog box.

b. In the Add Source Application dialog box, enter the settings below.

<!-- page 85 -->

Field Entry

Source application | Select the Ethos application for your ERP or other integrated
solution, such as Banner Integration API, Banner Student
API, or Colleague.

For Banner, you created two applications in Ethos
Integration: one for the Banner Student API and one for the
Banner Integration API. Perform these steps twice - one
time for each Banner application. You can enter the same
credentials (for the same Banner user) in both cases.

For CRM Engage, see the CRM Engage setup
documentation for procedures for entering credentials from
both CRM Advance and the Person Service, as needed.

Username Enter the username and password for the user account you
created in the integrated solution.

Password

Select aresource | Select any Ethos resource to which that user account has
permissions in the integrated solution.

You can select any resource for which you granted that user
account permissions in the integrated solution. Typical
examples:

e Banner Integration API: persons
e Banner Student API: sections
e Colleague Web API: persons or sections

Ethos Integration uses that resource to validate the user
credentials by confirming that the user account has access
to at least one resource in the ERP or other integrated
solution. After the credentials are validated, the application
will have access to all resources for which the user account
has been granted permissions.

c. Click Add.
d. Click Next.
5. On the Add Subscriptions page of the wizard, click Skip.

Ellucian Experience does not subscribe to data changes from other applications.

<!-- page 86 -->

#### (Optional) Restrict the Experience API key

1.Cl
to

ick View Application if you are ready to configure app-specific settings, or click Back
Applications if you want to just create the app now and configure settings later.

AnA
Elluc

PI key was automatically generated when you created the Ethos application for
ian Experience. You can optionally specify IP address restrictions on that API key so

that Ethos requests from Experience must come from only those IP addresses.

Use

hea

he procedure in Add a restricted API key to restrict the Experience API key. Enter a

commaz-delimited list of IP addresses in CIDR notation. Use the table below to determine

ppropriate IP addresses for your region and Experience environment (Test or

Production). Note that you must also enter the IP addresses for the Classes extension,

whic

Expe

h is used for the Classes and Class Schedule cards.

Example entry for the Experience production environment in the U.S. region, with both the

rience and Classes extension addresses:

3.213.247.37/32,3.221.108.177/32,23.23.100.94/32,44.217.150.118/32,
52.20.169.6,3.232.111.52

<!-- page 87 -->

Region IP Addresses in CIDR notation

US.

Experience Test:

- 3.226.114.59/32

- 3.225.23.59/32
Experience Production:
- 3.213.247.37/32

- 3.221.108.177/32

- 23.23.100.94/32

e 44.217.150.118/32

Classes extension (same IP addresses for both Test and
Production):

- 52.20.169.6

- 3.232.111.52

Canada

Test:

- 99.79.187.65/32
- 15.223.105.88/32
Production:
- 15.223.17.196/32

- 15.222.190.184/32

Classes extension (same IP addresses for both Test and
Production):

- 16.52.53.145

- 15.157.116.129

Europe

Test:
- 18.203.78.97/32

- $4.73.251.250/32

<!-- page 88 -->

### Add credentials to the Experience application

#### About this task

- 63.32.2

- 54.217.

- 176.34.

- 2.18.1

Production:

4.178/32

225.179/32

Classes extension (Same IP addresses for both Test and
Production):

238.147

74.94

Asia-Pacific Test:
- 3.2418

- 13.54.6

- 52.64.4

7.15/32

7130/32

Production:
- 52.63.247.216/32
e 52.62.40.165/32

Classes extension (same IP addresses for both Test and
Production):

191

- 3.104.225.143

In the Ethos application for Experience, a
requests to your ERP or other integrated

dd the credentials that support proxy API
solution.

This procedure is used to manually add credentials to the existing Ethos application for
Experience. You might have already added the necessary credentials when you created

the Ethos application using the Add Appl

ication wizard. If so, you can skip this procedure.

<!-- page 89 -->

#### Procedure

1. On the Ethos Integration header bar, click the gear icon & and then select the Ethos
environment where you want to perform this procedure.

2. On the Ethos Integration

header bar, click Applications.

3. On the Applications page, click the application for Ellucian Experience.

4. On the Application Overview page, click the Credentials tab.

5. On the Credentials page,

6. In the Add Credentials di

Source application

click Add Credentials.

alog box, enter the settings below.

Field Entry

Select the Ethos application for your ERP or other integrated
solution, such as Banner Integration API, Banner Student API, or

Colleague.
Username Enter the username and password for the user account you
Preerend created in the integrated solution.

Select a resource

Selec

exam

- Col

crede

permissions in the integrated solution.
You can select any resource for which you granted that user
account permissions in the integrated solution. Typical

- Banner Integration API: persons

e Banner Student API: sections

Ethos Integration uses that resource to validate the user

at least one resource in the ERP or other integrated solution.
After the credentials are validated, the application will have
access to all resources for which the user account has been
granted permissions.

any Ethos resource to which that user account has

ples:

eague Web API: persons or sections

ntials by confirming that the user account has access to

7. |n the dialog box, click Add Credentials.

<!-- page 90 -->

### Set up GraphQL requests to Data Access

#### Set up your ERP with Data Access

#### Add GraphQL resources to Ellucian Experience

#### Procedure

The Ellucian Experience content listed below retrieves Banner or Colleague data by
making GraphQL requests to Ellucian Ethos Data Access. Perform the procedures in this
section if you are using any of that content.

- The Housing Request card

e Any card you created using the Ellucian Experience SDK, and that you set up to retrieve
data from Data Access using GraphQL requests

Note: Some Experience cards and other content for other Ellucian solutions also use
GraphQL. The required GraphQL resources are listed with the documentation for
setting up each Ellucian solution with Experience.

If you are using a card that makes GraphQL requests to Ellucian Ethos Data Access, you
need to set up the loading of Colleague or Banner data into Data Access. See Configure
Data Access.

In Ethos Integration, set up Ellucian Experience to make GraphQL requests to Data
Access.

1. On the Ethos Integration header bar, click the gear icon 3 and then select the Ethos
environment where you want to perform this procedure.

2. On the Ethos Integration header bar, click Applications.

3. On the Applications page, click the application for Ellucian Experience.
4. On the Application Overview page, click the GraphQL Resources tab.
5. Click Add Resources.

6. In the Add Resources dialog box, select the resources for which this application should
make GraphQL requests to Data Access.

e For cards delivered with Ellucian Experience, select the resources listed in Resources

<!-- page 91 -->

### Enter the API key in Ellucian Experience

or which Ellucian Experience makes GraphQL requests.

- For cards you created using the Experience SDK, select the resources needed to
support those cards.

4. Click Add.

The Status column in the table of resources displays the loading status of the
resource in Data Access. For a description of each status, see Data Access statuses in
Ethos Integration.

Resources for which Ellucian Experience makes GraphQL requests

Ellucian Experience makes GraphQL requests to Data Access for the resources listed
here. Add the resources required to support the cards you are using.

Note: These are the GraphQL resources used in basic cards that surface ERP data.
Some Experience cards for other Ellucian solutions require additional GraphQL
resources. Those requirements are with the documentation for setting up each
Ellucian solution with Experience.

Experience card Required GraphQL resources

Housing Request academic-periods

buildings
housing-assignments
housing-requests
persons

rOOMS

Ellucian Experience must include its Ethos Integration API key in all requests it sends to
Ethos Integration. An API key was generated when you created the application in Ethos
Integration for Ellucian Experience. In this procedure, you will copy the API key from Ethos
Integration and then enter it in Ellucian Experience Setup.

<!-- page 92 -->

#### Procedure

1. In Ethos Integration, copy the API key:

a. On the Ethos Integration header bar, click the gear & icon and then select the
Ethos environment (for example, Test or Production) that you are connecting to
Ellucian Experience.

b. On the Ethos Integration header bar, click Applications.

c. On the Applications page, click the application for Ellucian Experience.

d. On the Application Overview page, click the API Keys tab.

e. On the API Keys page, locate the row for the API key and click the Copy 0) icon.

2. Access Ellucian Experience Setup:

a. In the Ellucian Customer Center, click Tools and then select the desired
Experience Setup instance under the Experience category:

- Click Experience Setup to access the Production instance of Experience Setup.
- Click Experience Setup Test to access the Test instance of Experience Setup.

b. In Experience Setup, in the Environments drop-down, select the same Ethos
environment you selected in Step 1.a.

3. Click the Dashboard Setup tab.
4. In the Ellucian Ethos Integration API key field, paste the API key.
5. Click Validate.

The validation attempts to access data models in the ERP that Ellucian Experience
requires. If you have licensed Experience Premium, the validation checks for all data
models required to support Experience features available with Experience Premium. If
you have licensed Experience Foundation, the validation checks only for the persons
data model.

If the validation is successful, a platform component for Ellucian Experience is created
in Ethos Integration.

If the validation fails, troubleshoot the issue as described in the table below.

<!-- page 93 -->

Error message
Invalid API key
format

or Invalid API key

or API key not
valid for this
tenant ID

Possible issues

The entered API key is
not in a valid format, or
it is not an Ethos API
key associated with
your tenant.

Things to check

Copy and paste the API key again.

Experience was
unable to retrieve
the desired
version of the
following models:

(followed by a list of
models)

The entered API key is
from the wrong
application in your
Ethos Integration
enant.

rom th

Colleag

application (not
ue application, for example)
in Ethos Integra

e Ellucian Experience

the Banner or

ion.

Make sure you copied the API key

The ERP user
credentials you entered
in the Ellucian
Experience application
in Ethos Integration are
incorrect.

Check

under t
whethe
creden
Studen

e Ifthe

in Ethos Integra
For Banner, the

he entered user credenti
ion.

he error message indica
r the problem is with the

als

ist of data models

es

ials for the Integration o
API:

buildings, persons, and

rooms data models are listed,
check the credentials you entered
or the Banner Integration API.

e If other data models are listed,

check the credentials you entered
or the Banner Student API.

The ERP user does not
have the required
permissions on the
data models in the ERP
that Ellucian
Experience requires.

Check the user setup as described
in Create a user for proxy API
requests.

The list of data models under the

error m

essage indicates the

models for which the user does not

have re

quired permissions.

2. Click Save.

- 2026 Ellucian Company LLC and its affiliates.

Pa

ge 94

<!-- page 94 -->

## (Banner MEP)

### Create a user for proxy API requests (Banner MEP)

#### About this task

#### Procedure

Related tasks

e Determine the Experience dashboard URL

Use these procedures if you are setting up Ellucian Experience with Ellucian Ethos
Integration in a Banner MEP environment.

If this is not a Banner MEP environment, use the procedures in Connect Ellucian
Experience to Ethos Integration instead.

Create a user in Banner to support API requests from Ellucian Experience.

Ellucian Experience makes API requests to Banner through Ethos Integration. Each
request includes the credentials for a user with permissions to access the data. You will
enter those user credentials in the Add Application wizard when you create the Ethos
applications for Ellucian Experience.

1. Check that Banner has been set up as the authoritative source for the resources for
which Ellucian Experience will make proxy API requests.

For the resources that Ellucian Experience needs to access, and the required
permissions for each data model, see Banner resources for API requests from
Experience.

Note: If you created the Banner applications in Ethos Integration from the catalog,
the required resources were automatically added when you created the
applications.

2. In Banner, create a user with the required permissions.

For the procedure for creating that user, see Create and Authorize a Banner User to
Enable Proxy API calls for Ethos Integration.

For the Banner security objects associated with each resource, see Banner resources

<!-- page 95 -->

#### Banner resources for API requests from Experience

for API requests from Experience.

Ellucian Experience needs access to specific Ethos resources to support API requests to

Banner through Ethos Integration.

The table below lists the resources along with the
access to those resources.

Banner security objects that provide

Experience.

Note: These are the resources used to retrieve user profile information and
information used in basic cards and card templates that surface ERP data. Some
Experience cards for other Ellucian solutions require additional resources. Those
requirements are with the documentation for setting up each Ellucian solution with

The security objects listed in the Banner Security Object column come from the API

Catalog. To determine the required security object

for any API, go to the home page of the

Ellucian Documentation site, click API Catalog > Banner API Catalog, and then search for
the desired API. On the page for the API, expand the GET method. The security object is
displayed as the value of the x-method-permissions field at the bottom of the

expanded section.

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 96 -->

Required
Resource Permissions Banner API Banner Security Object
academic- Read Student APILACADEMIC_CATALOGS
catalogs
academic- Read Student APILACADEMIC_CREDENTIALS
credentials
academic- Read Student APILACADEMIC_DISCIPLINES
disciplines
academic-levels | Read Student APILACADEMIC_LEVELS
academic- Read Student API_LACADEMIC_PERIODS
periods
academic- Read Student APILACADEMIC_PROGRAMS
programs
addresses Read Integration APILADDRESSES
advisor-types Read Student API_ADVISOR_TYPES
buildings Read Integration API_BUILDINGS
courses Read Student API_COURSES
course-title- Read Student API_COURSE_TITLE_TYPES
types
educational- Read Student APILEDU_INST_UNITS
institution-units
gender- Read Integration API_LGENDER_IDENTITIES
identities
grade- Read Student API_GRADE_DEFINITIONS
definitions
instructional- Read Student APILINSTRUCTIONAL_EVENTS
events
personal- Read Integration APILPERSONAL_PRONOUNS
pronouns
person-hold- Read Studen API_LPERSON_HOLD_TYPES
types
person-holds Read Studen API_LPERSON_HOLDS
persons Read Integration APILPERSONS
rooms Read Integration APILROOMS
sections Read Student API_SECTIONS

<!-- page 97 -->

section-grade- |Read Student API_SECTION_GRADE_TYPES
types

section- Read Student API_SECTION_INSTRUCTORS
instructors

section- Read Student API_SECTION_REG_INFORMATIO
registration- N

. . 1
information

section- Read Student API_LSECTION_REGISTRATIONS
registrations

section- Read Student API_SECTION_SCH_INFORMATIO
schedule- N

information'

section-title- Read Student API_SECTION_TITLE_TYPES
types

sites Read Integration API_SITES

student- Read Student API_LSTUDENT_ACADEMIC_PROG
academic- RAMS

programs

student-advisor- | Read Student APILSTUDENT_ADVISOR_RELATN
relationships SHPS

student- Read Student APILSTUDENT_TRANSCRIPT_GRA
transcript- DES

grades

student- Read Student APILSTUDENT_UNVERIFIED_GRA
unverified- DES

grades

students Read Student APILSTUDENTS

subjects Read Student API_SUBJECTS

user-identity- Read Integration API_LUSER_IDENTITY_PROFILES
profiles

|The section-registration-information and section-schedule-information
resources support improved performance in the Classes and Class Schedule cards, and

are available with Banner Ethos API 9.34.1 or later.

<!-- page 98 -->

### Create the applications in Ethos Integration for Ellucian

### Experience (Banner MEP)

#### Before you begin

#### About this task

#### Procedure

The application record contains basic information about Ellucian Experience and how it
interacts with Banner through Ethos Integration.

The Add Application wizard will prompt you for information about proxy API requests.
Before running the wizard, create a user in Banner for authentication of proxy API
requests. See Create a user for proxy API requests (Banner MEP).

Perform this procedure multiple times to create one Ethos application at the system level
and an Ethos application for each institution in your system. For example, if your system
has three institutions (Main Campus, North Campus, and South Campus), you would
create four Ethos applications (the names are examples):

e Ellucian Experience System-wide

e Ellucian Experience Main

e Ellucian Experience North

e Ellucian Experience South

1. On the Ethos Integration header bar, click the gear icon and then select the system-
level Ethos tenant and the desired Ethos environment (such as Test or Production).

Although you will create Ethos applications for each institution, you will create all
applications within the system level Ethos tenant in Ethos Integration, not within the
institution-level Ethos tenants.

2. On the Ethos Integration header bar, click Applications.
3. In the Create New App area of the page, click Manually.
4. In the Add Application dialog box, do the following:

a. Select Configure REST API proxy.

b. Click Continue.

<!-- page 99 -->

1. On the Application Details page of the wizard, enter the information described below
and then click Next.

Field Entry

Application name Enter a unique name for this application.
Example names:

e Ellucian Experience System-wide
e Ellucian Experience Main

e Ellucian Experience North

e Ellucian Experience South

Description (Optional) Enter a description of this application.

2. On the Add Source Applications page of the wizard, set up proxy API requests:

You will perform these steps twice, to add the Banner Integration API and then the
Banner Student API as source applications.

a. Click Add Source Application to open the Add Source Application dialog box.

b. In the Add Source Application dialog box, enter the settings below for the Banner
Integration API.

<!-- page 100 -->

Field Entry

Source application

Select the appropriate Ethos application for the Banner
Integration API.
Examples:

e If you are creating the Ellucian Experience North
application, select the Banner Integration North
application.

e If you are creating the system-level application, select the
appropriate Banner application depending on how you set
up Banner in Ethos Integration:

e If you created system-level Ethos applications for
Banner (that refer to a unique MEP code), select the
system-level application you created for the Banner
Integration API.

- If you did not create system-level Ethos applications for
Banner, select the shared resources application you
created for the Banner Integration API.

Username

Password

Enter the username and password for the user account you
created in Banner.

Select a resource

Select any Ethos resource to which that user account has
permissions in Banner.

You can select any resource for which you granted that user
account permissions in Banner. Typical examples:

e Banner Integration API: persons
e Banner Student API: sections

Ethos Integration uses that resource to validate the user
credentials by confirming that the user account has access
to at least one resource in Banner. After the credentials are
validated, the application will have access to all Banner
resources for which the user account has been granted
permissions.

c. Click Add.

d. Click Add Source Application to open the Add Source Application dialog box.

<!-- page 101 -->

b. In the Add Source Application dialog box, enter the settings below for the Banner

Student API.

Field Entry

Source application

Select the appropriate Ethos application for the Banner
Student API.
Examples:

e If you are creating the Ellucian Experience North
application, select the Banner Student North application.

e If you are creating the system-level application, select the
appropriate Banner application depending on how you set
up Banner in Ethos Integration:

e If you created system-level Ethos applications for
Banner (that refer to a unique MEP code), select the
system-level application you created for the Banner
Student API.

e If you did not create system-level Ethos applications for
Banner, select the shared resources application you
created for the Banner Student API.

Username

Password

Enter the username and password for the user account you
created in Banner.

Select a resource

Select any Ethos resource to which that user account has
permissions in Banner.

You can select any resource for which you granted that user
account permissions in Banner. Typical examples:

e Banner Integration API: persons
e Banner Student API: sections

Ethos Integration uses that resource to validate the user
credentials by confirming that the user account has access
to at least one resource in Banner. After the credentials are
validated, the application will have access to all Banner
resources for which the user account has been granted
permissions.

c. Click Add.

<!-- page 102 -->

#### (Optional) Restrict the Experience API key

b. Click Next.
3. On the Add Subscriptions page of the wizard, click Skip.
Ellucian Experience does not subscribe to data changes from Banner.

4. Click Back to Applications.

An API key was automatically generated when you created the Ethos application for
Ellucian Experience. You can optionally specify IP address restrictions on that API key so
that Ethos requests from Experience must come from only those IP addresses.

Use the procedure in Add a restricted API key to restrict the Experience API key. Enter a
comma-delimited list of IP addresses in CIDR notation. Use the table below to determine
the appropriate IP addresses for your region and Experience environment (Test or
Production). Note that you must also enter the IP addresses for the Classes extension,
which is used for the Classes and Class Schedule cards.

Example entry for the Experience production environment in the U.S. region, with both the
Experience and Classes extension addresses:

3.213.247.37/32,3.221.108.177/32,23.23.100.94/32,44.217.150.118/32,
52.20.169.6,3.232.111.52

<!-- page 103 -->

Region IP Addresses in CIDR notation

US.

Experience Test:

- 3.226.114.59/32

- 3.225.23.59/32
Experience Production:
- 3.213.247.37/32

- 3.221.108.177/32

- 23.23.100.94/32

e 44.217.150.118/32

Classes extension (same IP addresses for both Test and
Production):

- 52.20.169.6

- 3.232.111.52

Canada

Test:

- 99.79.187.65/32
- 15.223.105.88/32
Production:
- 15.223.17.196/32

- 15.222.190.184/32

Classes extension (same IP addresses for both Test and
Production):

- 16.52.53.145

- 15.157.116.129

Europe

Test:
- 18.203.78.97/32

- $4.73.251.250/32

<!-- page 104 -->

### Add credentials to the Experience application (Banner MEP)

#### About this task

- 63.32.2

- 54.217.

- 176.34.

- 2.18.1

Production:

4.178/32

225.179/32

Classes extension (Same IP addresses for both Test and
Production):

238.147

74.94

Asia-Pacific Test:
- 3.2418

- 13.54.6

- 52.64.4

7.15/32

7130/32

Production:
- 52.63.247.216/32
e 52.62.40.165/32

Classes extension (same IP addresses for both Test and
Production):

191

- 3.104.225.143

In the Ethos application for Experience, a
requests to Banner.

dd the credentials that support proxy API

This procedure is used to manually add credentials to the existing Ethos application for
Experience. You might have already added the necessary credentials when you created

the Ethos application using the Add Appl

ication wizard. If so, you can skip this procedure.

<!-- page 105 -->

#### Procedure

### Enter the API keys in Ellucian Experience (Banner MEP)

1. On the Ethos Integration header bar, click the gear icon & and then select the Ethos
environment where you want to perform this procedure.

2. On the Ethos Integration header bar, click Applications.
3. On the Applications page, click the application for Ellucian Experience.
4. On the Application Overview page, click the Credentials tab.

5. On the Credentials page, click Add Credentials.

6. In the Add Credentials dialog box, enter the settings below.

Field Entry

Source application | Select the Ethos application, such as Banner Integration API or
Banner Student API.

Username Enter the username and password for the user account you
created in Banner.

Password

Select a resource Select any Ethos resource to which that user account has
permissions in Banner.

You can select any resource for which you granted that user
account permissions in Banner. Typical examples:

- Banner Integration API: persons

e Banner Student API: sections

Ethos Integration uses that resource to validate the user
credentials by confirming that the user account has access to
at least one resource in Banner. After the credentials are
validated, the application will have access to all Banner
resources for which the user account has been granted
permissions.

7. |n the dialog box, click Add Credentials.

Ellucian Experience must include its Ethos Integration API key in all requests it sends to
Ethos Integration. An API key was generated when you created each application in Ethos

<!-- page 106 -->

#### About this task

#### Procedure

Integration for Ellucian Experience. In this procedure, you will copy the API keys from
Ethos Integration and then enter them in Ellucian Experience Setup.

You will perform this procedure multiple times - one time at the system level and one
time for each institution within your MEP system.

1. In Ethos Integration, copy the API key:

a.

On the Ethos Integration header bar, click the gear icon and then select the
system-level Ethos tenant and the desired Ethos environment (such as Test or
Production).

You will copy all API keys from the system-level Ethos tenant in Ethos Integration,
not from the institution-level Ethos tenants.

. On the Ethos Integration header bar, click Applications.

. On the Applications page, click one of the applications you created for Ellucian

Experience. (You created one Ethos application at the system level and an
application for each institution in the system.)

Example: Ellucian Experience North

. On the Application Overview page, click the API Keys tab.

. On the API Keys page, locate the row for the API key and click the Copy) icon.

Keep this browser window open. You will return here to copy the API keys for other
Ethos applications.

2. Access Ellucian Experience Setup:

a.

In the Ellucian Customer Center, click Tools and then select the desired
Experience Setup instance under the Experience category:

e Click Experience Setup to access the Production instance of Experience Setup.

- Click Experience Setup Test to access the Test instance of Experience Setup.

. In Experience Setup, in the Environments drop-down, select the appropriate Ethos

tenant (system-level tenant or institution-level tenant) and the desired Ethos
environment (such as Test or Production).

Examples (using example names):

<!-- page 107 -->

e If you selected the Test environment in Ethos Integration in Step 1.a, and you
copied the API key from the Ellucian Experience System-wide Ethos
application, select the My College: Test environment in Experience Setup.

e If you selected the Production environment in Ethos Integration in Step 1.a, and
you copied the API key from the Ellucian Experience North Ethos application,
select the My College North: Production environment in Experience Setup.

Note that, although you always select the system-level Ethos tenant in Ethos
Integration, you select the specific Ethos environment (system level or institution
level) in Experience Setup.

3. Click the Dashboard Setup tab.

4.

n the Ellucian Ethos Integration API key field, paste the API key.

5. Click Validate.

f the validation is successful, a platform component for Ellucian Experience is created
n Ethos Integration.

The validation attempts to access data models in Banner that Ellucian Experience
requires. If the validation fails, troubleshoot the issue as described in the table below.

<!-- page 108 -->

Error message
Invalid API key
format

or Invalid API key

or API key not
valid for this
tenant ID

Possible issues

The entered API key is
not in a valid format, or
it is not an Ethos API
key associated with
your tenant.

Things to check
Copy and paste the API key again.

Experience was
unable to retrieve
the desired
version of the
following models:

(followed by a list of
models)

The entered API key is
from the wrong
application in your
Ethos Integration
tenant.

Make sure that you copied the API
key from the Ellucian Experience
application (not the Banner or
Colleague application, for example)
in Ethos Integration.

The Banner or
Colleague user
credentials that you
entered in the Ellucian
Experience application
in Ethos Integration are
incorrect.

Check the entered user credentia
in Ethos Integration.
For Banner, the list of data models
under the error message indicates
whether the problem is with the
credentials for the Integration o
Student API:

SS

e If the buildings, persons, and
rooms data models are listed,
check the credentials that you
entered for the Banner
Integration API.

If other data models are listed,
check the credentials that you

entered for the Banner Student
API.

The Banner or
Colleague user does
not have the required
permissions on the
data models in Banner
or Colleague that
Ellucian Experience
requires.

Check the user setup as described
in Create a user for proxy API
requests.

The list of data models under the
error message indicates the
models for which the user does not
have required permissions.

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 109 -->

## Whitelisting to support Experience

1. Click Save.

2. Repeat the steps above for each institution within your system.

Experience needs to be able to communicate through your firewall to retrieve data from
your on-premises systems and to display content on the dashboard.

Whitelist the addresses in the table below for your region. You need to whitelist two types
of addresses:

e Experience IP Addresses - Experience must have access through your firewall to
systems installed at your institution from which Experience gets data directly rather
than through Ethos Integration. Your firewall rules must allow for inbound requests
from the Ellucian Experience IP addresses.

e Amazon S3 Storage - Some Experience content is stored in Amazon S3 buckets. The
Experience dashboard must have access to the S3 bucket to retrieve the content to
display on the dashboard. Because the specific bucket might change, you should use a
wildcard when whitelisting the S3 location as shown in the table below.

<!-- page 110 -->

Region

USS.

Experience IP Addresses

Test:

e 3.226.114.59
- 3.225.23.59
Production:
- 3.213.247.37

- 3.221.108.177

- 23.23.100.94

e 44.217.150.118

Amazon S3 Storage

- s3.us-east-1.amazonaws.com

Canada

Test:

- 99.79.187.65

- 15.223.105.88

Production:

- 15.223.17.196

@ 159.222.190.184

- s3.ca-central-1.amazonaws.com

Europe

Test:

- 18.203.78.97
- 54.73.251.250
Production:

- 63.32.24.178

e $4.217.225.179

- s3.eu-west-1.amazonaws.com

Asia-Pacific

Test:

- 3.24.187.15

- 13.54.67.130

Production:

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 111 -->

## Set up Ellucian Experience with an identity provider

### Set up person identifiers

#### About this task

- $3.ap-

- BRIER ZAI ZING southeast-2.amazonaws.com

- 52.62.40.165

Ellucian Experience uses a SAML 2.0-compliant identity provider for authentication and
authorization for Ellucian Experience users.

Ellucian Experience has been tested with AD FS, Entra ID, Ellucian Ethos Identity, and
Shibboleth.

Note:Ellucian Experience supports most SAML 2.0 features with all of the tested
identity providers. Single logout has been verified with Ethos Identity.

Set up person identifiers in the integrated solution, and in the identity store, to support
Ellucian Experience.

Each SAML claim sent from an identity provider to Ellucian Experience includes a person
identifier that Ellucian Experience uses to identify the user in the integrated solution (the
ERP or other Ellucian solution from which Experience gets person data through Ethos

Integration).

You must set up the person identifier in both the integrated solution and the identity store:

e Users must be set up in the integrated solution with an identifier populated in one of
the person identifier types listed in the table below. These choices come from the
persons data model in Ellucian Ethos.

e Each user must also be set up in the identity store with that same identifier in one of
the attributes.

<!-- page 112 -->

#### Procedure

Integrated solution Supported person identifier types

Banner bannerld
bannerUdcld

bannerUserName

Colleague colleaguePersonld

colleagueUserName

PowerCampus powerCampuslid
powerCampusUserName

CRM Advance crmAdvanceUserName

CRM Engage

Quercus elevateld

Other person sources ethosPersonld

Example with Colleague as the integrated solution and AD FS as the identity provider:
- You might decide to use colleaguePersonId as the person identifier type.

e Inthat case, Active Directory must have the colleaguePersonId populated in an
Active Directory attribute, such as Employee-Number.

Experience supports implementations with multiple integrated solutions, such as both an
ERP and CRM Advance. For these implementations, you set up your identity provider with
person claims for both solutions, and Experience searches both solutions in the order you
specify when searching for a particular person. To support multiple claims, each person
source must be configured with Ellucian Person Manager.

1. Decide on the person identifier type that you want to use for Ellucian Experience. See
the considerations described above.

2. Ensure that an attribute in your identity store is populated with that person identifier
for all Ellucian Experience users.

In later procedures, you will create a claim in the identity provider for person identifier,
and then enter both that claim name and the person identifier type in Ellucian

<!-- page 113 -->

### (Multi-institution) Set up the institution affiliation attribute

#### About this task

#### Procedure

#### What to do next

Experience Setup.

If you have a multi-institution Experience implementation, set up the attribute in your
identity provider that allows Experience users to easily view multiple dashboards.

Users who need access to multiple Experience dashboards within your system can view
another dashboard by selecting it from a drop-down list under the user profile avatar. To
populate that list, Experience uses a claim that maps to the identity store attribute that
holds the list of a user's affiliated institutions. You will need to populate the associated
attribute in your identity provider for any user who needs to be able to easily view multiple
dashboards.

Creating this claim is optional. If you don't create this claim, those users will still have
access to all of their dashboards, but they will not have the convenience of selecting
another dashboard from the user profile.

1. In your identity provider, identify an attribute that will hold the list of a user's Experience
dashboards.

2. Determine the values of that attribute that you will use for each Experience dashboard.

There should be a value corresponding to each dashboard in your system. For

example:
Dashboard Possible value for the IdP attribute
My College Main main
My College North north
My College South south

3. For each Experience user who will need access to multiple dashboards, populate that
identity provider attribute with all sites that the user should be able to access.

Example: If a user should have access to the "My College Main" and "My College North"
dashboards, you might populate that attribute with main,north for that user.

<!-- page 114 -->

### Set up Ellucian Experience with AD FS

#### Enter AD FS access information in Ellucian Experience

#### About this task

#### Procedure

Later, when you set up claims in your identity provider, you will:

1. In your identity provider, create a claim and associate that claim with the attribute for
institution affiliation.

2. On the Claims tab in Experience Setup, map each value of the attribute to the
associated dashboard.

Perform these procedures if you are using Active Directory Federation Services (AD FS)
as the identity provider for Ellucian Experience.

Before performing these procedures, complete the following steps:

e Select the type of person identifier to use with Ellucian Experience and populate an
attribute in your identity provider with that identifier. See Set up person identifiers.

e If this is a multi-institution implementation of Experience, set up the attribute in your
identity provider that allows Experience users to easily switch between dashboards.
See (Multi-institution) Set up the institution affiliation attribute.

In Ellucian Experience Setup, enter information used to access AD FS.

The steps below are based on the AD FS 2.0 Management console. If you have a different
AD FS version, the user interface might differ from these steps.

1. Access Ellucian Experience Setup:

a. In the Ellucian Customer Center, click Tools and then select the desired
Experience Setup instance under the Experience category:

e Click Experience Setup to access the Production instance of Experience Setup.
- Click Experience Setup Test to access the Test instance of Experience Setup.

b. (If applicable) In Experience Setup, in the Environments drop-down, select the
desired Ethos environment.

<!-- page 115 -->

The option to select an environment is available only if multiple Ethos
environments are associated with this Experience Setup instance.

Note: If this is a multi-institution Experience implementation, select the
system-level Ethos environment. Identity provider settings are defined at the
system level. If you access Experience Setup at the institution level, you can
view the settings defined at the system level, but you cannot change the
settings.

3. Click the Identity Provider tab.

4. Enter the following values:

Field Entry

Service provider issuer Enter an identifier by which Ellucian Experience will be
nown in AD FS. Later, you will enter this same identifier
in AD FS.

Example: ellucian-experience

Identity provider entry Enter https: //your_adfs_server_name/adfs/1s
point

Example: https: //adfsserver.mycollege.edu/
adfs/1s

Identity provider logout Enter the same value that you entered in the Identity
URL provider entry point field.

5. Add the AD FS public certificate to Ellucian Experience:
a. In the AD FS Management console, select Service > Certificates.

b. In the Certificates window, in the Token-signing section, select the certificate and
hen click View Certificate in the right pane.

f there is more than one certificate, select the primary certificate.

c. In the Certificate dialog box, click the Details tab and then click Copy to File.

d. Follow the prompts in the Certificate Export Wizard.
- For export file format, select Base-64 encoded x.509 (.CER).

- Specify a filename and a location on your AD FS server for the file.

<!-- page 116 -->

#### Set up Ellucian Experience as a trusted relying party in AD FS

#### About this task

b. Ina text editor, open the certificate file that you just created.

c. Copy the contents between, but not including, the ----BEGIN CERTIFICATE---- and
---END CERTIFICATE-— lines.

d. In Experience Setup, in the Identity provider public certificate field, paste the
certificate text that you just copied.

5. Switch the Disable Request Authentication Context setting to the On position if your
authentication setup requires that the authentication context be omitted from the
authentication request that Ellucian Experience sends to the identity provider.
Otherwise, leave this setting turned off (the default).

By default, Ellucian Experience includes the authentication context in the
authentication request. Some authentication methods, such as multi-factor
authentication (MFA), require that the authentication context not be included in the
authentication request.

6. Specify the SSO session timeout in Ellucian Experience to match the timeout in AD FS.

a. In the AD FS Management console, click Service in the left pane, and then click
Edit Federation Service Properties in the right pane.

a
5

he Federation Service Properties dialog box, on the General tab, note the value
he Web SSO lifetime field.

>

c. In Experience Setup, in the Single sign-on session timeout field, select a timeout
duration to match the Web SSO lifetime value from AD FS. If there is not an exact
match, make the Experience timeout smaller than the AD FS timeout.

7. In Experience Setup, click Save.

Create the relying party trust

In AD FS, create a relying party trust for Ellucian Experience.

The steps below are based on the AD FS 2.0 Management console. If you have a different
AD FS version, the user interface might differ from these steps.

<!-- page 117 -->

#### Procedure

1. In Experience Setup, click the Service Provider tab.
Keep this browser tab open. You will copy information from here into AD FS.
2. On your AD FS server, access the AD FS Management console.
3. In the AD FS Management console, select Trust Relationships > Relying Party Trusts.
4. In the right pane, click Add Relying Party Trust.
5. In the Add Relying Party Trust wizard, click Start.

6. On the Select Data Source page, select Enter data about the relying party manually
and then click Next.

7. On the Select Display Name page, enter a name in the Display Name field and then
click Next.
Example name: Ellucian Experience

8. On the Choose Profile page, select AD FS 2.0 profile and then click Next.
9. On the Configure Certificate page, click Next.
10. On the Configure URL page, do the following:
a. Select Enable support for the SAML 2.0 WebSSO Protocol.

b. In Experience Setup, click the Copy 4 icon next to Assertion consumer service
URL.

c. Back in AD FS Management, paste that URL into the Relying party SAML 2.0 SSO
service URL field.

d. Click Next.
11. On the Configure Identifiers page, do the following:
a. In Experience Setup, click the Copy icon next to Issuer.

b. Back in AD FS Management, paste that issuer identifier into the Relying party
trust identifier field and then click Add.

c. Click Next.

12. On the Choose Issuance Authorization Rules page, select Permit all users to access
this relying party and then click Next.

<!-- page 118 -->

#### What to do next

#### About this task

#### Procedure

1. Click Next and then click Close to complete the wizard.

Next, you will add claim rules for the new relying party trust. AD FS might automatically
open the Edit Claim Rules dialog box when you complete the Add Relying Party Trust
wizard.

Add claim rules

AD FS uses claim rules to map Active Directory attributes to claims.

The steps below are based on the AD FS 2.0 Management console. If you have a different
AD FS version, the user interface might differ from these steps.

1. Perform the following steps to access the Edit Claim Rules dialog box.

If you just completed the Add Relying Party Trust wizard, that dialog box might already
be open. If so, skip to Step 2.

a. Inthe AD FS Management console, select Trust Relationships > Relying Party
Trusts.

b. Select the relying party trust you created for Ellucian Experience, and then click
Edit Claim Rules in the right pane.

2. In the Edit Claim Rules dialog box, click Add Rule.

3. Select Send LDAP Attributes as Claims and then click Next.

4. On the Configure Rule page, do the following:
a. In the Claim rule name field, enter a descriptive name such as LDAP claims.
b. In the Attribute store field, select Active Directory.

c. In the Mapping of LDAP attributes to outgoing claim types table, create the
mappings in the table below.

Note: If you are integrating Ellucian Experience with Ellucian Workflow, your

<!-- page 119 -->

LDAP attribute setup must reflect the attribute (user ID or person identifier) to
be used when looking up user records in Ellucian Workflow workspaces, and
must be consistent with your configuration of the Ellucian Workflow Inbox
card:

e To use user ID when looking up user records:

e The LDAP attribute that you specify below for user ID must match the
LDAP attribute that you specified for Workflow in Add the claim rules to
the relying party trust.

e Disable the Use Person Identifier Claim for User Matching toggle switch
when configuring the Ellucian Workflow Inbox card.

e To use person identifier when looking up user records:

e The LDAP attribute that you specify below for person identifier must
match the LDAP attribute that you specified for Workflow.

e Enable the Use Person Identifier Claim for User Matching toggle switch
when configuring the Ellucian Workflow Inbox card.

See the description of the Use Person Identifier Claim for User Matching
setting in Set up the Ellucian Workflow Inbox card in Experience for guidance
on which attribute (user ID or person identifier) to use.

<!-- page 120 -->

LDAP Attribute Outgoing Claim Type

Select the Active Directory attribute that
you are using to identify users across
Ethos applications.

Example: Email address

Enter userId (with a capital |)

Select the Active Directory attribute that
holds your person identifier, as
described in Set up person identifiers.

Example: Employee-Number

Enter a claim name that describes this
as the person identifier claim.

Example: colleague_id

Make a note of this claim name. You
will enter it later in Ellucian Experience
Setup.

If your Experience implementation uses
multiple sources of person information,
such as both an ERP and CRM
Advance, create a claim for each
person source. To support multiple
claims, each person source must be
configured with Ellucian Person
Manager.

Optional) If you are using identity
provider roles with Experience, select
he Active Directory attribute that
contains the list of Active Directory user
roles that you want to use with Ellucian
Experience.

For guidance in creating roles in the
identity provider, see Set up identity
provider roles.

(Optional - this claim is needed only if
you are using identity provider roles

with Experience) Enter a claim name
that describes this as the roles claim.

Example: roles

Make a note of this claim name. You
will enter it later in Ellucian Experience
Setup.

Optional; multi-institution only) Select
the Active Directory attribute that holds
the list of a user's affiliated institutions.
See (Multi-institution) Set up the
institution affiliation attribute.

- 2026 Ellucian Company LLC and its affiliates.

(Optional; multi-institution only) For
implementations of the multi-institution
feature set for shared ERP frameworks,
such as Banner MEP enter a claim
name that describes this as the
affiliated institutions claim.

Example: affiliatedInstitutions

<!-- page 121 -->

on

Make a note of this claim name. You
will enter it later in Ellucian Experience
Setup.

c. Click Finish.
. Click Add Rule to add another rule.

Select Transform an Incoming Claim and then click Next.

. On the Configure Rule page, enter the following:

Field Entry

Claim rule name Enter a descriptive name such as Name _ ID.
Incoming claim type Enter userId (with a capital !)
Outgoing claim type Select Name ID

Outgoing name ID format | Select Email. This format is appropriate even if you are
using something other than email address for userld.

. Click Finish.

. In the Edit Claim Rules dialog box, click OK.

. Enter claim and identifier information into Ellucian Experience settings:
a. In Experience Setup, click the Claims tab.

b. Optional: (If you are using identity provider roles with Experience) In the Role
claim name field, enter the name of the roles claim you created in the identity
provider.

Example: roles

c. In the Mapping IDP Claim to Ellucian Person Source table, enter the person
identifier information.

<!-- page 122 -->

Field Entry

Person identifier claim | Enter the name of the person identifier claim you
name created in the identity provider.

Example: colleague_id

Person identifier type Select the person identifier type that you want to use
for Ellucian Experience. This type should be
associated with the claim that you entered in the
Person identifier claim name field. See Set up
person identifiers for details.

c. To define additional person identifier claim mappings, click ADD CLAIM and then
enter the settings.

Note: The ADD CLAIM button is currently visible only to customers in the
CRM Engage select release program. See Configure Ellucian Experience for
CRM Engage for details.

The table supports multiple person claim mappings. Many institutions will have
just one person claim, for your ERP. You might have multiple person claims, for
example, if you are using Experience with both an ERP and another solution such
as CRM Engage.

Experience uses just one source of person information. If you have defined
multiple mappings that return person information about a particular user,
Experience will use the first mapping listed in the table that returns person
information for that user.

d. (Optional; multi-institution only) If you created an institution affiliation claim, enter
the institution affiliation information in the Individual Institution Affiliations
section.

. Inthe Claim name field, enter the name of the institution affiliation claim you
created in the identity provider.

Example: affiliatedInstitutions

i. In the table, enter the institution affiliation mappings. Create a mapping for each
institution in your system. To add a mapping, click Add institution affiliation +
and then enter the values.

<!-- page 123 -->

#### About this task

#### Procedure

Field Entry

Institution Identifier For one of the institutions in your system, enter the
value that you are using for this institution in your
identity provider.

Example: For the North campus, this value might be
north.

Institution Select the corresponding Ethos tenant.

Example: My College North

c. Click Save.

Add the logout endpoint

Add the Ellucian Experience logout URL as an endpoint in AD FS.

The steps below are based on the AD FS 2.0 Management console. If you have a different
AD FS version, the user interface might differ from these steps.

1. In Experience Setup, on the Service Provider tab, click the Copy icon next to Logout
response URL.

You will paste that URL into AD FS later in this procedure.

2. In the AD FS Management console, select Trust Relationships > Relying Party Trusts.

3. Select the relying party trust you created for Ellucian Experience, and then click
Properties in the right pane.

4. In the Properties dialog box, click the Endpoints tab.
5. Click Add SAML.

6. In the Add an Endpoint dialog box, enter the following:

<!-- page 124 -->

#### About this task

#### Procedure

Field Entry

Endpoint type Select SAML Logout
Binding Select POST
Trusted URL Enter https: //your_adfs_server_name/adfs/1s

Example: https: //adfsserver.mycollege.edu/
adfs/1s

Response URL Paste the logout URL that you copied from Ellucian
Experience Setup in Step 1.

2. Click OK.

3. Back in the Properties dialog box, click OK.

Add the Ellucian Experience certificate to AD FS

Add the Ellucian Experience public certificate to AD FS to support secure communication.

The steps below are based on the AD FS 2.0 Management console. If you have a different
AD FS version, the user interface might differ from these steps.

1. In Experience Setup, on the Service Provider tab, click the Copy & icon next to
Signing certificate.

2. In a text editor, create a new text file and enter the following:
eos55 BEGIN CERTIFICATE-----
<paste the certificate that you just copied from Ellucian Experience

Setup>
secre END CERTIFICATE-----

3. Save the text file with a .cer extension.
4. Move the new certificate file to your AD FS server.

5. In the AD FS Management console, select Trust Relationships > Relying Party Trusts.

<!-- page 125 -->

### Set up Ellucian Experience with Entra ID

#### Documentation for setup in Entra ID

#### Create an enterprise application in Entra ID

#### Procedure

1. Select the relying party trust you created for Ellucian Experience, and then click
Properties in the right pane.

2. In the Properties dialog box, click the Signature tab.
3. Click Add.
4. Browse to the certificate file that you copied to the AD FS server, and then click Open.

5. Back in the Properties dialog box, click OK.

Perform these procedures if you are using Microsoft Entra ID as the identity provider for
Ellucian Experience.

Before performing these procedures, complete the following steps:

- Select the type of person identifier to use with Ellucian Experience and populate an
attribute in your identity provider with that identifier. See Set up person identifiers.

e If this is a multi-institution implementation of Experience, set up the attribute in your
identity provider that allows Experience users to easily switch between dashboards.
See (Multi-institution) Set up the institution affiliation attribute.

This documentation contains procedures for setup in Entra ID. The Entra ID user interface
might change without Ellucian's knowledge. If the Entra ID user interface does not match
the steps in this documentation, consult Microsoft documentation for the comparable
procedures.

In Entra ID, create the enterprise application that will contain the information about the
connection with Ellucian Experience.

1. In Microsoft Entra ID, access the Enterprise applications page.

2. On the All applications page, click New application.

3. On the Browse Microsoft Entra Gallery page, click Create your own application.

<!-- page 126 -->

#### Define the basic SAML configuration in Entra ID

#### Procedure

1. In the Create your own application area on the right side of the page, enter a name for
the app and then click Create.
Example name: Ellucian Experience
You can accept the default option under "What are you looking to do with your
application?"

In Entra ID, enter settings that support the connection with Ellucian Experience.

1. Perform these steps to access the SAML-based Sign-on page in Entra ID:
a. In Microsoft Entra ID, access the Enterprise applications page.

b. On the All applications page, click the application you created for Ellucian
Experience.

c. In the Manage section of the menu, click Single sign-on.

d. (Required only the first time) On the Select a single sign-on method page, click the
SAML tile.

2. In the Basic SAML Configuration section of the page, click Edit.

3. In the Identifier (Entity ID) field, enter an identifier by which Ellucian Experience will be
known in Entra ID. Later, you will enter this same identifier in Experience Setup.
Example: ellucian-experience

Keep this browser tab open. You will copy information from Experience Setup to here.
4. Access Ellucian Experience Setup:

a. In the Ellucian Customer Center, click Tools and then select the desired
Experience Setup instance under the Experience category:

e Click Experience Setup to access the Production instance of Experience Setup.
- Click Experience Setup Test to access the Test instance of Experience Setup.

b. (If applicable) In Experience Setup, in the Environments drop-down, select the
desired Ethos environment.

The option to select an environment is available only if multiple Ethos

<!-- page 127 -->

#### Enter Entra ID access information in Ellucian Experience

#### Procedure

environments are associated with this Experience Setup instance.

Note: If this is a multi-institution Experience implementation, select the
system-level Ethos environment. Identity provider settings are defined at the
system level. If you access Experience Setup at the institution level, you can
view the settings defined at the system level, but you cannot change the

settings.

3. Click the Service Provider tab.

4. Copy the settings listed below from Experience Setup to Entra ID.

Copy this value from Experience Setup __ Paste it into this field on the Basic SAML

Configuration pane in Entra ID

Assertion consumer service URL Reply URL (Assertion Consumer Service
URL)
Logout response URL Logout Url
5. In Experience Setup, click the Dashboard Setup tab.

6. Copy the setting listed below from Experience Setup to Entra ID.

Copy this value from Experience Setup _ Paste it into this field in Entra ID

Ellucian Experience Dashboard URL Sign on URL

You can leave the optional Relay State field blank.

7. |n Entra ID, click Save.

In Ellucian Experience Setup, enter information used to access Entra ID.

1. In Experience Setup, click the Identity Provider tab.

Keep this browser tab open. You will copy information from Entra ID to here.
2. Perform these steps to access the SAML-based Sign-on page in Entra ID:

a. In Microsoft Entra ID, access the Enterprise applications page.

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 128 -->

#### application name

b. On the All applications page, click the application you created for Ellucian
Experience.

c. In the Manage section of the menu, click Single sign-on.

d. (Required only the first time) On the Select a single sign-on method page, click the
SAML tile.

5. In the Basic SAML Configuration area in Entra ID, copy the setting listed in the table
below to Ellucian Experience Setup.

Copy this value from Entra ID Paste it into this field on the Identity
Provider tab in Ellucian Experience

Setup

Identifier (Entity ID) Service provider issuer

6. Inthe Set up <appLication name> area in Entra ID, copy the settings listed in the
table below to Ellucian Experience Setup.

Copy this value from Entra ID Paste it into this field on the Identity
Provider tab in Ellucian Experience
Setup

Login URL Identity provider entry point

Logout URL Identity provider logout URL

7. Add the Entra ID public certificate to Ellucian Experience:

a. In Entra ID, in the SAML Certificates > Token signing certificate section of the
page, click Download next to Certificate (Base 64).

b. Open the certificate file that you just downloaded in a text editor.

c. Copy the contents between, but not including, the ----BEGIN CERTIFICATE---- and
----END CERTIFICATE---- lines.

d. In Experience Setup, in the Identity provider public certificate field, paste the
certificate text that you just copied.

8. Go to the Experience Setup browser tab that you have open.

9. Switch the Disable Request Authentication Context setting to the On position if your
authentication setup requires that the authentication context be omitted from the
authentication request that Ellucian Experience sends to the identity provider.
Otherwise, leave this setting turned off (the default).

<!-- page 129 -->

#### Add the Ellucian Experience certificate to Entra ID

#### Procedure

By default, Ellucian Experience includes the authentication context in the
authentication request. Some authentication methods, such as multi-factor
authentication (MFA), require that the authentication context not be included in the
authentication request.

2. In the Single sign-on session timeout field, select a timeout duration to match the
token lifetime value that you have specified in Entra ID settings. If there is not an exact
match, make the Experience timeout smaller than the Entra ID timeout.

For guidance in specifying the token timeout in Entra ID, see Configurable token
lifetimes in the Microsoft identity platform.

3. Click Save.

Add the Ellucian Experience public certificate to Entra ID to support secure
communication.

1. In Experience Setup, on the Service Provider tab, click the Copy & icon next to
Signing certificate.

2. Ina text editor, create a new text file and enter the following:
oo5e5 BEGIN CERTIFICATE-----
<paste the certificate that you just copied from Ellucian Experience

Setup>
secre END CERTIFICATE-----

3. Save the text file with a .cer extension.
Example filename: ellucian_experience_sso.cer
4. Perform these steps to access the SAML-based Sign-on page in Entra ID:
a. In Microsoft Entra ID, access the Enterprise applications page.

b. On the All applications page, click the application you created for Ellucian
Experience.

c. In the Manage section of the menu, click Single sign-on.

<!-- page 130 -->

#### Add Entra ID claims

#### Procedure

b. (Required only the first time) On the Select a single sign-on method page, click the
SAML tile.

3. In the SAML Certificates > Verification certificates section of the page, click Edit.
4. In the Verification certificates pane, do the following:

a. Select the Require verification certificates check box.

b. Click Upload certificate.

c. In the Upload certificate dialog, in the Select a file field, browse to the certificate
file you created earlier in this procedure.

d. Click OK.

e. Click Save.

Set up claims in Entra ID, and enter the claim information in Experience Setup.

1. Perform these steps to access the SAML-based Sign-on page in Entra ID:
a. In Microsoft Entra ID, access the Enterprise applications page.

b. On the All applications page, click the application you created for Ellucian
Experience.

c. In the Manage section of the menu, click Single sign-on.

d. (Required only the first time) On the Select a single sign-on method page, click the
SAML tile.

2. In the Attribute and Claims section of the page, click Edit.

3. From the Attribute and Claims page, add the claims in the table below. For each claim:
a. Click Add new claim.
b. On the Manage claim page, enter the information in the table below.

c. Click Save.

<!-- page 131 -->

Note: If you are integrating Ellucian Experience with Ellucian Workflow, your Local
Claim setup must reflect the attribute (user ID or person identifier) to be used
when looking up user records in Ellucian Workflow workspaces, and must be
consistent with your configuration of the Ellucian Workflow Inbox card:

e To use user ID when looking up user records:

e The Local Claim that you specify below for user ID must match the local
claim that you specified for Workflow in Add the claim rules to the relying
party trust.

e Disable the Use Person Identifier Claim for User Matching toggle switch
when configuring the Ellucian Workflow Inbox card.

- To use person identifier when looking up user records:

e The Local Claim that you specify below for person identifier must match the
local claim that you specified for Workflow.

e Enable the Use Person Identifier Claim for User Matching toggle switch
when configuring the Ellucian Workflow Inbox card.

See the description of the Use Person Identifier Claim for User Matching setting
in Set up the Ellucian Workflow Inbox card in Experience for guidance on which
attribute (user ID or person identifier) to use.

<!-- page 132 -->

Name Source attribute

Enter userId (with a capital !)

Select the Entra ID attribute that you are
using to identify users across Ethos
applications.

Example: user.userprincipalname

Enter a claim name that describes this as
he person identifier claim.

Example: colleague_id

ake a note of this claim name. You will
enter it later in Ellucian Experience Setup.

f your Experience implementation uses
multiple sources of person information,
such as both an ERP and CRM Advance,
create a claim for each person source. To
support multiple claims, each person
source must be configured with Ellucian
Person Manager.

Select the Entra ID attribute that holds
your person identifier.

(Optional - this claim is needed only if you
are using identity provider roles with
Experience) Enter a claim name that
describes this as the roles claim.

Example: roles

ake a note of this claim name. You will
enter it later in Ellucian Experience Setup.

Select the Entra ID attribute that holds the
list of user roles.

For guidance in creating roles in the
identity provider, see Set up identity
provider roles.

Optional; multi-institution only) For
implementations of the multi-institution
feature set for shared ERP frameworks,
such as Banner MEP enter a claim name
hat describes this as the affiliated
institutions claim.

Example: affiliatedInstitutions

ake a note of this claim name. You will
enter it later in Ellucian Experience Setup.

Select the Entra ID attribute that holds the
list of a user's affiliated institutions. See
(Multi-institution) Set up the institution
affiliation attribute.

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 133 -->

1. Enter claim and identifier information into Ellucian Experience settings:
a. In Experience Setup, click the Claims tab.
b. Optional: (If you are using identity provider roles with Experience) In the Role
claim name field, enter the name of the roles claim you created in the identity
provider.

Example: roles

c. In the Mapping IDP Claim to Ellucian Person Source table, enter the person
identifier information.

Field Entry

Person identifier claim | Enter the name of the person identifier claim you
name created in the identity provider.

Example: colleague_id

Person identifier type Select the person identifier type that you want to use
for Ellucian Experience. This type should be
associated with the claim that you entered in the
Person identifier claim name field. See Set up
person identifiers for details.

d. To define additional person identifier claim mappings, click ADD CLAIM and then
enter the settings.

Note: The ADD CLAIM button is currently visible only to customers in the
CRM Engage select release program. See Configure Ellucian Experience for
CRM Engage for details.

The table supports multiple person claim mappings. Many institutions will have
just one person claim, for your ERP. You might have multiple person claims, for
example, if you are using Experience with both an ERP and another solution such
as CRM Engage.

Experience uses just one source of person information. If you have defined
multiple mappings that return person information about a particular user,
Experience will use the first mapping listed in the table that returns person
information for that user.

e. (Optional; multi-institution only) If you created an institution affiliation claim, enter
the institution affiliation information in the Individual Institution Affiliations

<!-- page 134 -->

#### Add users and groups in Entra ID

#### Procedure

section.

. Inthe Claim name field, enter the name of the institution affiliation claim you

created in the identity provider.

Example: affiliatedInstitutions

i. In the table, enter the institution affiliation mappings. Create a mapping for each
institution in your system.
and then enter the values.

To add a mapping, click Add institution affiliation +

Field Entry

Institution Identifier

For one of the institutions in your system, enter the
value that you are using for this institution in your
identity provider.

Example: For the North campus, this value might be
north.

Institution

Select the corresponding Ethos tenant.

Example: My College North

c. Click Save.

In Entra ID, assign users and groups to the enterprise application you created for Ellucian
Experience. Only users assigned here will be able to access the application through single
sign-on, unless the app is configured to allow unassigned users.

1. In Microsoft Entra ID, access the

Enterprise applications page.

2. On the All applications page, click the application you created for Ellucian Experience.

3. In the Manage section of the menu, click Users and groups.

4. On the Users and groups page, c

ick Add user/group.

5. On the Add Assignment page, in the left pane, click None Selected.

6. On the Users page, select the En
Ellucian Experience.

ra ID users and groups who should have access to

- 2026 Ellucian Company LLC and its af

iliates. Page 135

<!-- page 135 -->

### Set up Ellucian Experience with Ethos Identity

#### Ethos Identity claims to support Experience

You can add individual users, security groups, or Microsoft 365 groups.
2. Click Select.

3. Back on the Add Assignment page, in the Select a role section of the page, choose a
role if one has been explicitly defined for your organization.

If no roles are defined, the default role of Default Access will be used automatically,
which is sufficient in most scenarios for Ellucian Experience. Role selection is relevant
only if your organization uses role-based access control (RBAC) or custom SAML role
claims. Experience does not require role selection by default.

4. Click Assign.

Perform these procedures if you are using Ellucian Ethos Identity as the identity provider
for Ellucian Experience.

Before performing these procedures, complete the following steps:

- Select the type of person identifier to use with Ellucian Experience and populate an
attribute in your identity provider with that identifier. See Set up person identifiers.

e If this is a multi-institution implementation of Experience, set up the attribute in your
identity provider that allows Experience users to easily switch between dashboards.
See (Multi-institution) Set up the institution affiliation attribute.

To support Ellucian Experience, you will need to create claims in Ethos Identity.

The following claims support Ellucian Experience:
e The claim you are using to identify users across Ethos applications.

- Aclaim that maps to the identity store attribute that holds your person identifier, as
described in Set up person identifiers.

If your Experience implementation uses multiple sources of person information, such
as both an ERP and CRM Advance, create a claim for each person source. To support
multiple claims, each person source must be configured with Ellucian Person

Manager.

(Optional) A claim that maps to the identity store attribute that holds the list of user
roles. This claim is needed only if you are using identity provider roles. For guidance in

<!-- page 136 -->

#### Enter Ethos Identity access information in Ellucian Experience

#### Procedure

creating roles in the identity provider, see Set up identity provider roles.

- (Optio

nal; multi-institution only) For implementations of the multi-institution feature set

for shared ERP frameworks, such as Banner MEP an optional claim that maps to the

identit
see (

y store attribute that holds the list of a user's affiliated institutions. For details,
multi-institution) Set up the institution affiliation attribute.

You might have already created some of these claims for other purposes. If not, you will

need toc
see Confi

Make an

reate them. For the procedures for adding or modifying claims in Ethos Identity,
gure claim mapping.

ote of the claim names. Later, you will map these global claims to claims

specific to the Ellucian Experience service provider.

In Ellucian Experience Setup, enter information used to access Ethos Identity.

Procedu

re

1. Access Ellucian Experience Setup:

a.In

the Ellucian Customer Center, click Tools and then select the desired

Experience Setup instance under the Experience category:

Click Experience Setup to access the Production instance of Experience Setup.

Click Experience Setup Test to access the Test instance of Experience Setup.

b. (If applicable) In Experience Setup, in the Environments drop-down, select the
desired Ethos environment.

The option to select an environment is available only if multiple Ethos
environments are associated with this Experience Setup instance.

Note: If this is a multi-institution Experience implementation, select the
system-level Ethos environment. Identity provider settings are defined at the
system level. If you access Experience Setup at the institution level, you can
view the settings defined at the system level, but you cannot change the
settings.

2. Click the Identity Provider tab.

3. In the Service provider issuer field, enter an identifier by which Ellucian Experience will
be known in Ethos Identity. Later, you will enter this same identifier in Ethos Identity.

<!-- page 137 -->

Example: ellucian-experience
2. Enter Ethos Identity URLs into Ellucian Experience Setup:
a. Access the WSO2 Identity Server Management Console.
b. Expand Inbound Authentication Configuration > SAML2 Web SSO Configuration

c. Copy the settings listed in the table below to Ellucian Experience Setup.

Copy this setting from the WSO2 Paste it into this field on the Identity

Identity Server Management Console _ Provider tab in Ellucian Experience
Setup

SSO URL Identity provider entry point

Logout URL Identity provider logout URL

3. Add the Ethos Identity public certificate to Ellucian Experience:
You can use the steps below to get the certificate.

a. In the WSO2 Identity Server Management Console, under SAML2 Web SSO
Configuration, click Download SAML Metadata.

b. Open the XML file that you just downloaded in a text editor.
c. Copy the certificate text between the <x509Certificate> tags.

d. In Experience Setup, in the Identity provider public certificate field, paste the
certificate text that you just copied.

4. Switch the Disable Request Authentication Context setting to the On position if your
authentication setup requires that the authentication context be omitted from the
authentication request that Ellucian Experience sends to the identity provider.
Otherwise, leave this setting turned off (the default).

By default, Ellucian Experience includes the authentication context in the
authentication request. Some authentication methods, such as multi-factor
authentication (MFA), require that the authentication context not be included in the
authentication request.

5. Specify the SSO session timeout in Ellucian Experience to match the timeout in Ethos
Identity.

a. Access the WSO2 Identity Server Management Console.

b. Click the Main tab.

<!-- page 138 -->

#### Set up Ellucian Experience as a service provider in Ethos Identity

#### Procedure

b. Go to Identity Providers > Resident.
c. Note the value in the Idle Session Time Out field.

d. In Experience Setup, in the Single sign-on session timeout field, select a timeout
duration to match the Idle Session Time Out value from Ethos Identity. If there is
not an exact match, make the Experience timeout smaller than the Ethos Identity
timeout.

5. In Experience Setup, click Save.

In Ethos Identity, create the service provider definition that contains information about
Ellucian Experience.

1. Access the WSO2 Identity Server Management Console.
2. Click the Main tab.

3. Go to Service Providers > Add.

4. In the Service Provider Name field, enter a name that uniquely identifies the
application.
Example: Ellucian Experience

5. Click Register to create the service provider definition.

6. Perform the following steps to add claims to the service provider definition:
a. Expand Claim Configuration.
b. Select Define Custom Claim Dialect.

c. Add the claims in the table below. Click Add Claim URI to add each claim.

Note: If you are integrating Ellucian Experience with Ellucian Workflow, your
Local Claim setup must reflect the attribute (user ID or person identifier) to be
used when looking up user records in Ellucian Workflow workspaces, and
must be consistent with your configuration of the Ellucian Workflow Inbox
card:

e To use user ID when looking up user records:

<!-- page 139 -->

e The Local Claim that you specify below for user ID must match the local
claim that you specified for Workflow in Add the claim rules to the relying
party trust.

e Disable the Use Person Identifier Claim for User Matching toggle switch
when configuring the Ellucian Workflow Inbox card.

e To use person identifier when looking up user records:

e The Local Claim that you specify below for person identifier must match
the local claim that you specified for Workflow.

e Enable the Use Person Identifier Claim for User Matching toggle switch
when configuring the Ellucian Workflow Inbox card.

See the description of the Use Person Identifier Claim for User Matching
setting in Set up the Ellucian Workflow Inbox card in Experience for guidance
on which attribute (user ID or person identifier) to use.

<!-- page 140 -->

Service Provider Claim

userld

Local Claim

Select the claim that you are
using to identify users across
Ethos applications.

Example: http://wso2.org/
claims/emailaddress

Requested Claim

Select this check
box.

Enter a claim name that
describes this as the person
identifier claim.

Example: colleague_id

ake a note of this claim
name. You will enter it later in
Ellucian Experience Setup.

f your Experience
implementation uses
multiple sources of person
information, such as both an
ERP and CRM Advance,
create a claim for each
person source. To support
multiple claims, each person

Select the claim that maps to
the identity store attribute
that holds your person
identifier.

Select this check
box.

- 2026E

source must be configured
with Ellucian Person
anager.
Optional - this claim is Select the claim that maps to | Select this check
needed only if you are using | the identity store attribute box.
identity provider roles with that holds the list of user
Experience) Enter a claim roles.
name that describes this as
he roles claim. For guidance in creating
roles in the identity provider,
Example: roles see Set up identity provider
roles.
ake a note of this claim
name. You will enter it later in
Ellucian Experience Setup.
Optional; multi-institution
only) For implementations of
lucian Company LLC and its affiliates. Page 141

<!-- page 141 -->

the multi-institution feature
set for shared ERP
frameworks, such as Banner
MEP enter a claim name that
describes this as the
affiliated institutions claim.

Example:
affiliatedInstitutions

Make a note of this claim
name. You will enter it later in
Ellucian Experience Setup.

Select the claim that maps to
the identity store attribute
that holds the list of a user's
affiliated institutions. See
(Multi-institution) Set up the
institution affiliation attribute.

Select this check
box.

3. Enter claim and identifier information into Ellucian Experience settings:

a. In Experience Setup, click the Claims tab.

b. Optional: (If you are using identity provider roles with Experience) In the Role
claim name field, enter the name of the roles claim you created in the identity

provider.

Example: roles

identifier information.

Person identifier claim
name

c. In the Mapping IDP Claim to Ellucian Person Source table, enter the person

Field Entry

Enter the name of the person identifier claim you
created in the identity provider.

Example: colleague_id

Person identifier type

Select the person identifier type that you want to use
for Ellucian Experience. This type should be
associated with the claim that you entered in the
Person identifier claim name field. See Set up
person identifiers for details.

d. To define additional person identifier claim mappings, click ADD CLAIM and then

enter the settings.

Note: The ADD CLAIM button is currently visible only to customers in the
CRM Engage select release program. See Configure Ellucian Experience for

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 142 -->

CRM Engage for details.

The table supports multiple person claim mappings. Many institutions will have
just one person claim, for your ERP. You might have multiple person claims, for
example, if you are using Experience with both an ERP and another solution such
as CRM Engage.

Experience uses just one source of person information. If you have defined
multiple mappings that return person information about a particular user,
Experience will use the first mapping listed in the table that returns person
information for that user.

c. (Optional; multi-institution only) If you created an institution affiliation claim, enter
the institution affiliation information in the Individual Institution Affiliations
section.

i. In the Claim name field, enter the name of the institution affiliation claim you
created in the identity provider.

Example: affiliatedInstitutions

ii. In the table, enter the institution affiliation mappings. Create a mapping for each
institution in your system. To add a mapping, click Add institution affiliation +
and then enter the values.

Field Entry

Institution Identifier For one of the institutions in your system, enter the
value that you are using for this institution in your
identity provider.

Example: For the North campus, this value might be
north.

Institution Select the corresponding Ethos tenant.

Example: My College North

d. Click Save.
5. In Experience Setup, click the Service Provider tab.
Keep this browser tab open. You will copy information from here into Ethos Identity.

6. Return to the service provider configuration in the WSO2 Identity Server Management
Console.

<!-- page 143 -->

1. Perform the following steps to add Ellucian Experience access information to the
service provider definition:
a. Expand Inbound Authentication Configuration > SAML2 Web SSO Configuration.
b. Click Configure to access the Register New Service Provider page.
c. In Experience Setup, click the Copy & icon next to Issuer.

d. Back in the WSO2 Identity Server Management Console, paste that issuer
identifier into the Issuer field.

e. In Experience Setup, click the Copy icon next to Assertion consumer service
URL.

f. Back in the WSO2 Identity Server Management Console, paste that URL into the
Assertion Consumer URLs field, and then click Add.

g. In the NamelD format field, accept the default of
urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress.

This format is appropriate even if you are using something other than email
address for userld.

h. Select the Enable Single Logout check box.

i. In Experience Setup, on the Service Provider tab, click the Copy /' icon next to
Logout response URL.

j. Back in the WSO2 Identity Server Management Console, paste that URL into the
SLO Response URL field.

k. Perform the following steps if you want users to be automatically logged out of
Ellucian Experience when they log out of another application that also uses Ethos
Identity for authentication:

e In Experience Setup, click the Copy & icon next to Single logout request URL.

e Back in the WSO2 Identity Server Management Console, paste that URL into the
SLO Request URL field.

|. In the Logout Method section, select Back-Channel Logout.
m. Select the following check boxes:
e Enable Response Signing

e Enable Attribute Profile

<!-- page 144 -->

#### Add the Ellucian Experience certificate to Ethos Identity

#### Procedure

e Include Attributes in the Response Always
e Enable IdP Initiated SSO
e. Accept the defaults for the other settings on the page, and click Register.

6. On the service provider configuration page, click Update.

Add the Ellucian Experience public certificate to Ethos Identity to support secure
communication.

1. In Experience Setup, on the Service Provider tab, click the Copy & icon next to
Signing certificate.

2. Ina text editor, create a new text file and enter the following:
oo5e5 BEGIN CERTIFICATE-----
<paste the certificate that you just copied from Ellucian Experience

Setup>
secre END CERTIFICATE-----

3. Save the text file with a .crt extension.
Example filename: ellucian_experience_sso.crt
4. Move the new certificate file to any location on your Ethos Identity server.
5. Access the WSO2 Identity Server Management Console.
6. Click the Main tab.
7. Go to Keystores > List.
8. In the row for your keystore, click Import Cert.

9. On the Import Certificates page, click Browse and then browse to the Ellucian
Experience certificate file, and then click Open.

10. Click Import.

11. Go to Service Providers > List.

<!-- page 145 -->

### Set up Ellucian Experience with Shibboleth

#### Enter Shibboleth access information in Ellucian Experience

#### About this task

#### Procedure

1. In the row for the service provider you created for Ellucian Experience, click Edit.
2. Expand Inbound Authentication Configuration > SAML2 Web SSO Configuration.
3. Click Edit to access the Register New Service Provider page.

4. Select the Enable Signature Validation in Authentication Requests and Logout
Requests check box.

5. In the Certificate Alias field, select the certificate that you imported.

6. Click Update.

Perform these procedures if you are using Shibboleth as the identity provider for Ellucian
Experience.

Because Shibboleth setup can vary depending on your Shibboleth version, these
procedures provide general guidance, rather than specific instructions, for tasks
performed in Shibboleth.

Before performing these procedures, complete the following steps:

- Select the type of person identifier to use with Ellucian Experience and populate an
attribute in your identity provider with that identifier. See Set up person identifiers.

e If this is a multi-institution implementation of Experience, set up the attribute in your
identity provider that allows Experience users to easily switch between dashboards.
See (Multi-institution) Set up the institution affiliation attribute.

In Ellucian Experience Setup, enter information used to access Shibboleth.

Because Shibboleth setup can vary depending on your Shibboleth version, these
procedures provide general guidance, rather than specific instructions, for tasks
performed in Shibboleth.

1. Access Ellucian Experience Setup:

<!-- page 146 -->

a. In the Ellucian Customer Center, click Tools and then select the desired
Experience Setup instance under the Experience category:
e Click Experience Setup to access the Production instance of Experience Setup.
- Click Experience Setup Test to access the Test instance of Experience Setup.

b. (If applicable) In Experience Setup, in the Environments drop-down, select the
desired Ethos environment.

The option to select an environment is available only if multiple Ethos
environments are associated with this Experience Setup instance.

Note: If this is a multi-institution Experience implementation, select the
system-level Ethos environment. Identity provider settings are defined at the
system level. If you access Experience Setup at the institution level, you can
view the settings defined at the system level, but you cannot change the
settings.

2. Click the Identity Provider tab.

3. Enter the following values:

<!-- page 147 -->

Field Entry

Service provider issuer Enter an identifier by which Ellucian Experience will be
known in Shibboleth. Later, you will enter this same
identifier in Shibboleth.

Example: ellucian-experience

Identity provider entry Enter the Shibboleth single sign-on URL.
point

Example: https://<your_shibboLeth_server>/idp/
profile/SAML2/Redirect/SSO

In this example, Shibboleth is deployed under a web
application named idp.

Identity provider logout Enter the Shibboleth logout URL.
URL
Example: https://<your_shibboLeth_server>/idp/

profile/SAML2/Redirect/SLO

Identity provider public Paste in the text of the public certificate from
certificate Shibboleth. Open the certificate in a text editor and copy
everything between, but not including, the

=)

----BEGIN CERTIFICATE---- and ---END CERTIFICATE---
lines.
Disable Request Switch the Disable Request Authentication Context

Authentication Context setting to the On position if your authentication setup
requires that the authentication context be omitted from
the authentication request that Ellucian Experience
sends to the identity provider. Otherwise, leave this
setting turned off (the default).

By default, Ellucian Experience includes the
authentication context in the authentication request.
Some authentication methods, such as multi-factor
authentication (MFA), require that the authentication
context not be included in the authentication request.

Single sign-on session Select a timeout duration to match the session timeout
timeout value in Shibboleth. If there is not an exact match, make
the Experience timeout smaller than the Shibboleth
timeout.

<!-- page 148 -->

#### Create the relying party in Shibboleth for Ellucian Experience

#### About this task

#### Procedure

1. Click Save.

In Shibboleth, create the relying party definition that contains information about Ellucian
Experience.

Because Shibboleth setup can vary depending on your Shibboleth version, these

procedures provide general guidance, rather than specific instructions, for tasks
performed in Shibboleth.

1. Create the relying party definition in Shibboleth.

2. In the relying party, define the following properties:

Property Subproperty Value

SAML2.SSO Name ID format Enter
urn:oasis:names:tc:SAML:1.1:namei
d-format:emailAddress

Note: The name ID format might be
defined in multiple places in
Shibboleth. Enter this format in all of
those places.

Sign responses Yes

Sign assertions Yes

Encrypt assertions (e)

Encrypt NamelDs_ |No

SAML2.Logout Sign responses Yes

Sign assertions No

Encrypt assertions (e)

Encrypt NamelDs_ |No

<!-- page 149 -->

1. In the relying party, define the Shibboleth attributes that Ellucian Experience requires:

Note: If you are integrating Ellucian Experience with Ellucian Workflow, your LDAP
attribute setup must reflect the attribute (user ID or person identifier) to be used
when looking up user records in Ellucian Workflow workspaces, and must be
consistent with your configuration of the Ellucian Workflow Inbox card:

e To use user ID when looking up user records:

e The LDAP attribute that you specify below for user ID must match the LDAP
attribute that you specified for Workflow in Add the claim rules to the relying
party trust.

e Disable the Use Person Identifier Claim for User Matching toggle switch
when configuring the Ellucian Workflow Inbox card.

e To use person identifier when looking up user records:

e The LDAP attribute that you specify below for person identifier must match
the LDAP attribute that you specified for Workflow.

e Enable the Use Person Identifier Claim for User Matching toggle switch
when configuring the Ellucian Workflow Inbox card.

See the description of the Use Person Identifier Claim for User Matching setting
in Set up the Ellucian Workflow Inbox card in Experience for guidance on which
attribute (user ID or person identifier) to use.

<!-- page 150 -->

LDAP Attribute SAML Response Attribute

The Shibboleth attribute that you are
using to identify users across Ethos
applications.

Example: Email address

userId (with a capital I)

The Shibboleth attribute that holds the
person identifier for your users, as
described in Set up person identifiers.

Example: colleague_id or banner_id

Make a note of this person identifier
attribute name. You will enter it later in
Ellucian Experience Setup.

If your Experience implementation uses
multiple sources of person information,
such as both an ERP and CRM Engage,
define an attribute for each person
source. To support multiple attributes,
each person source must be configured
with Ellucian Person Manager.

(Optional - this claim is needed only if you
are using identity provider roles with
Experience) The Shibboleth attribute that
holds the list of user roles.

For guidance in creating roles in the
identity provider, see Set up identity
provider roles.

Example: roles

Make a note of this roles attribute name.
You will enter it later in Ellucian
Experience Setup.

Optional; multi-institution only) The Example: affiliatedInstitutions
Shibboleth attribute that holds the list of a
user's affiliated institutions. See (Multi- ake a note of this affiliated institutions
institution) Set up the institution affiliation | attribute name. You will enter it later in
attribute. Ellucian Experience Setup.
. Enter claim and identifier information into Ellucian Experience settings:
a. In Experience Setup, click the Claims tab.

b. Optional: (If you are using identi
claim name field, enter the name of the
provider.

- 2026 Ellucian Company LLC and its affiliates.

ity provider roles with Experience) In the Role

roles claim you created in the identity

<!-- page 151 -->

Example: roles

c. In the Mapping IDP Claim to Ellucian Person Source table, enter the person
identifier information.

Field Entry

Person identifier claim | Enter the name of the person identifier claim you
name created in the identity provider.

Example: colleague_id

Person identifier type Select the person identifier type that you want to use
for Ellucian Experience. This type should be
associated with the claim that you entered in the
Person identifier claim name field. See Set up
person identifiers for details.

d. To define additional person identifier claim mappings, click ADD CLAIM and then
enter the settings.

Note: The ADD CLAIM button is currently visible only to customers in the
CRM Engage select release program. See Configure Ellucian Experience for
CRM Engage for details.

The table supports multiple person claim mappings. Many institutions will have
just one person claim, for your ERP. You might have multiple person claims, for
example, if you are using Experience with both an ERP and another solution such
as CRM Engage.

Experience uses just one source of person information. If you have defined
multiple mappings that return person information about a particular user,
Experience will use the first mapping listed in the table that returns person
information for that user.

e. (Optional; multi-institution only) If you created an institution affiliation claim, enter
the institution affiliation information in the Individual Institution Affiliations
section.

. Inthe Claim name field, enter the name of the institution affiliation claim you
created in the identity provider.

Example: affiliatedInstitutions

i. In the table, enter the institution affiliation mappings. Create a mapping for each

<!-- page 152 -->

#### Import Ellucian Experience metadata into Shibboleth

#### About this task

#### Procedure

institution in your system. To add a mapping, click Add institution affiliation t+
and then enter the values.

Field Entry

Institution Identifier For one of the institutions in your system, enter the
value that you are using for this institution in your
identity provider.

Example: For the North campus, this value might be
north.

Institution Select the corresponding Ethos tenant.

Example: My College North

d. Click Save.

Shibboleth uses the information in the metadata xml to access Ellucian Experience.

Because Shibboleth setup can vary depending on your Shibboleth version, these
procedures provide general guidance, rather than specific instructions, for tasks
performed in Shibboleth.

1. In Experience Setup, click the Service Provider tab.

Keep this browser tab open. You will copy information from here into Shibboleth.

2. Copy the metadata text from Identity provider metadata xml and paste it into a text
editor.

3. In Experience Setup, click the Copy 0) icon next to Issuer.
4. Paste that value into the metadata file, replacing {{service-provider-issuer}} .

5. In Experience Setup, on the Service Provider tab, click the Copy & icon next to
Signing certificate.

6. Paste that certificate into the metadata file in two places, replacing {{sp-public-

<!-- page 153 -->

key}} .
2. Save the metadata xm file.

3. Import the metadata xml into Shibboleth, using the procedures for entering service
provider metadata xml in your Shibboleth version.

Identity provider metadata xml

The metadata xml contains information that the identity provider needs to access
Ellucian Experience.

You will need to replace {{service-provider-issuer}} and {{sp-public-key}} with values from
Ellucian Experience Setup.

If you have set up Shibboleth to use the validUntil date to determine whether the
metadata is still valid, change it to a future date and continue to update it as needed. If
you have not set up Shibboleth to use the validUntil date, you can leave the date as-
is. Experience does not require or use this date.

<?xml version="1.0" encoding="UTF-8" ?>
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.@:metadata""
entityID="{{service-provider-issuer}}" validUntil="2026-01-01T00:00:00Z">
<md:SPSSODescriptor
protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"
AuthnRequestsSigned="true" WantAssertionsSigned="false">
<md:KeyDescriptor use="signing">
<ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"> <ds:X5@9Data>
<ds:x509Certificate>{{sp-public-key}}</ds:x5e9Certificate>
</ds:X509Data>
</ds:KeyInfo>
</md:KeyDescriptor>
<md:KeyDescriptor use="encryption">
<ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"> <ds:X5@9Data>
<ds:x509Certificate>{{sp-public-key}}</ds:x5e9Certificate>
</ds:X5@9Data>
</ds:KeyInfo>
</md:KeyDescriptor>
<md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-
format: emailAddress</md:NameIDFormat>
<md:SingleLogoutService
Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
Location="https://eee-api.10005.elluciancloud.com/saml-prod/postlogout"
isDefault="true" />
<md:AssertionConsumerService Location="https://eee-
api.10005.elluciancloud.com/saml-prod/token" index="0"
Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
isDefault="true"/>
</md:SPSSODescriptor>
</md:EntityDescriptor>

<!-- page 154 -->

## Set up roles for Ellucian Experience

#### How Experience uses roles

#### Where roles are defined

In Ellucian Experience, roles are used to determine what content is available to each user
and to grant application permissions.

When content administrators set up cards and other dashboard content, they select roles
to specify which users can access the content. Ellucian Experience needs a role for each
constituency that requires different access in Experience, such as students, faculty, and
employees.

You can also optionally use roles to grant application permissions, as described in About
Experience application permissions. (You can grant application permissions to either
individual users or roles.)

Ellucian Experience can use roles defined in the following places:

- Identity provider (IdP) roles - These are roles that you define, and assign to users, in
your directory server. Identity provider roles are sent to Experience in a SAML claim.

e ERP roles - These are roles defined in Banner on the Business Rules (GORRSQL) page
or in Colleague on the Organization Role Definition (ORGR) form.

Ethos roles - These are roles defined in the roles property in the Ethos persons
data model and assigned to users based on user setup in the ERP. The available Ethos
roles are:

- alumni

- advisor

- employee

- instructor

- prospectiveStudent
- student

- vendor

When you add roles on the Roles tab in Experience Setup, you specify the source (IdP.
ERP or Ethos).

<!-- page 155 -->

#### High level procedure

### Set up identity provider roles

#### Before you begin

Note:|f you choose to use Ethos roles for access to content, you might still need to
create an identity provider role or ERP role for any groups to which you want to be
able to target content, that are not among the seven defined in the Ethos persons
data model.

In the procedures below, you will do the following:
- Set up roles and assign them to users:

- If you choose to use identity provider roles, create those roles and assign them to
users in your directory server.

o If you choose to use ERP roles, create those roles and assign them to users in
Banner or Colleague.

- If you choose to use Ethos roles, review the information describing how a user's
setup in the ERP determines that user's Ethos roles.

n Ellucian Experience Setup, enter the names of the roles that you have set up in your
identity provider and ERP.

Other procedures in this documentation cover the following:
- (If you choose to use identity provider roles) As part of setting up your identity provider
for Ellucian Experience, create a claim for roles, and enter that claim name in Ellucian

Experience Setup.

e As you set up cards and other content, select roles to specify which users have access
o that content.

If you choose to use identity provider roles with Ellucian Experience, create those roles
and assign them to users in your directory server.

Before setting up roles, you need to set up Experience with your identity provider. See Set
up Ellucian Experience with an identity provider.

<!-- page 156 -->

#### About this task

#### Procedure

### Set up Banner roles for Experience

Consider the following when choosing role names:

e Experience supports role names with spaces and special characters. Commas are not
supported.

e Experience supports role names up to 60 characters long.

- Specify descriptive, user-friendly role names. When Ellucian Experience content editors
set up access to cards and other content, they will select from a list of the role names
that you define here.

For multi-institution implementations, also consider the following:

e When you enter these roles in Experience Setup, you can specify some roles at the
system level, available when configuring content for all institution dashboards in the
system; and other roles at the institution level, available only when configuring content
for that institution. You might want to have an idp-student role for all students in
the system and an idp-student-main role for students on the Main Campus.

Some users might have access to multiple institution dashboards, with a different role
at each institution. For example, a person might be a student at the Main Campus and
staff at the North Campus. If you use a system-wide idp-student role for all
student-facing content, that person would see student content at the North Campus,
which might not be desired. To avoid this situation, you would need to use institution-
specific student roles as described above.

1. In your directory server, create the roles needed to support Ellucian Experience.

2. In your directory server, assign those roles to appropriate users.

If you choose to use Banner roles with Ellucian Experience, create those roles and assign
them to users in Banner.

Experience uses Banner roles defined on the Business Rules (GORRSQL) page and stored
in the GORIROL table. When an Experience user accesses their dashboard, Experience
retrieves that user's roles directly from Banner. The Banner roles do not need to be
synced with the identity provider.

<!-- page 157 -->

#### Prerequisites

#### Defining roles in Banner

Experience accesses Banner role information using the user-identity-profiles API, which
requires:

e Install Banner Ethos API 9.25 or later. The user-identity-profiles API was introduced
with Banner Ethos API 9.25.

e In Ethos Integration, ensure that the Ethos application for the Banner Integration API
owns the user-identity-profiles resource.

e Ensure that the Banner user account for proxy API requests (the user account whose
credentials are entered in the Ethos application for Experience) has Read permissions
on user-identity-profiles , which is associated with the
API_USER_IDENTITY_PROFILES security object. For the procedure, see Assign
privileges to the Banner user.

This capability uses your existing processes for assigning Banner roles to users. The
table below shows special considerations to support Experience.

<!-- page 158 -->

Step Comments

On the Business Rule Code Validation
(GTVSQRU) page, define the role names.

For general guidance in using the
GTVSQRU page, see Business Rule Code
Validation (GTVSQRU) page.

On the Business Rules (GORRSQL) page,
enter SQL queries to define roles.

For general guidance in using the
GORRSQL page, see Business Rules
(GORRSQL) page.

In the Process field on the GORRSQL page,
specify the INTCOMP process code.

Ellucian delivers some INTCOMP roles,
such as STUDENT, FACULTY, and
EMPLOYEE. You can use these delivered
oles and modify them as needed. The
delivered INTCOMP roles use internal BEP
events to force re-evaluation of a user's
oles, and update the user's roles in the
GORIROL table, in response to changes in
Banner data.

n the Rule field on the GORRSQL page,
specify a role name that you defined on the
GTVSQRU page.

Run the GURIROL or GURIROL process to
populate the GORIROL table with
information about the roles assigned to a
group of people.

The GJRIROL process was introduced in
Banner General 9.3.30 and enhanced in
Banner General 9.3.33, and offers improved
performance compared to GURIROL. If you
have installed Banner General 9.3.33 or
ater, Ellucian recommends that you use
the GJRIROL process.

For general guidance, see Institution Role

aintenance (GURIROL) process and
nstitution Role Maintenance (GURIROL)
process.

You can schedule the GJRIROL or
GURIROL process to run as needed to
reevaluate the list of roles assigned to a
group of people.

- 2026 Ellucian Company LLC and its affiliates.

<!-- page 159 -->

### Set up Colleague roles for Experience

#### Prerequisites

#### Defining roles in Colleague

If you choose to use Colleague roles with Ellucian Experience, create those roles and
assign them to users in Colleague.

Experience uses Colleague organization roles defined on the Organization Role Definition
(ORGR) form. When an Experience user accesses their dashboard, Experience retrieves
that user's roles directly from Colleague. The Colleague roles do not need to be synced
with the identity provider.

Experience accesses Colleague role information using the user-identity-profiles API,
which requires:

nstall Colleague Web API 2.1.1 or later. The version of the user-identity-profiles API
used by Experience was released with Colleague Web API 2.1.1.

ua

n Ethos Integration, ensure that the Ethos application for Colleague owns the user-
identity-profiles resource.

e Ensure that the Colleague user account for proxy API requests (the user account
whose credentials are entered in the Ethos application for Experience) has the
VIEW.ANY.PERSON permission. This permission is also required by Experience to
access the persons resource, so the proxy user likely already has this permission.
For the procedure, see Assign permissions to the API user organizational role.

The use of Colleague roles in Experience uses your existing processes for assigning
Colleague organization roles to users. The table below shows special considerations to
support Experience.

<!-- page 160 -->
