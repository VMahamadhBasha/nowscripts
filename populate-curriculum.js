const fs = require('fs');
const path = require('path');

const curriculum = `## 🎓 ADMINISTRATION COURSE CURRICULUM

---

### Lesson 01 - Cloud Computing Basics
- Introduction to Cloud Computing
- What is Cloud Computing
- Private and Public Cloud
- What is the Difference Between SAAS and PAAS
- What are the Benefits of Cloud Computing?

---

### Lesson 02 - Introduction to ITIL
- What is ITIL
- Introduction to ITIL Foundation
- ITIL Versions
- Benefits of ITIL Standards
- ITIL Approaches
- Roles and Responsibility of IT Help Desk
- Modules in ITIL

---

### Lesson 03 - Servicenow Overview and Introduction
- Introduction to ITSM
- Overview of ITSM
- Introduction of Servicenow
- What is Servicenow?
- Why and who can use Servicenow
- History of Servicenow
- Servicenow Features
- Servicenow Objectives
- Servicenow Lifecycle
- Architecture of Servicenow
- Servicenow Market Trends
- Prerequisites for Servicenow
- Servicenow Versions

---

### Lesson 04 - PDI Account Creation
- New PDI Account Creation
- Request for Developer Instance
- How do we reset admin Password
- Who will create Developer Instance
- Use of stats.do

---

### Lesson 05 – User Interface
- What is User Interface (UI)?
- Difference Between UI15 and UI16
- User Profile
- Basic Configuration
- Purpose of Impersonate User
- Use of Global Search
- Toggle Connect Sidebar
- Settings (Available Component)

---

### Lesson 06 - Forms
- What is Form & Record?
- Form Headers and Fields
- Form Design and Form Layout
- Work with Form Sections
- Field Properties
- Working with Annotation
- Creating Custom Fields from Design and Form Layout
- Configure .Dot Walking
- Form Customization and Personalization

---

### Lesson 07 - Formatters
- What is Formatter?
- Types of formatters in base system
- Working with all types Formatters
- Create process flow formatter for Incident Table

---

### Lesson 08 - Lists
- Filters and Search Conditions in Lists
- Types of Record Searches
- What about Condition Builder
- Breadcrumbs and Usage
- Context Menus
- Personalizing and Customizing Lists
- Filters Add to Favorite
- Configure List Layout
- List Controls
- List Calculations
- Purpose of Wild Card Entries
- Filters & Searches
- Update Multiple Records
- Wild Card Entries

---

### Lesson 09 - Plugins
- What is Plugin?
- Predefined Plugins Installed in Servicenow
- Activate and Deactivating Plugins
- Upgrading Plugins
- Importance of Dependency Plugins
- Importance of Load Demo Data
- Who will Request Plugins?
- Repair and Upgrade Plugins
- How to Request Plugin in Real Time?
- HI Service Portal (Now Support)

---

### Lesson 10 - Tables and Fields and Columns
- Introduction to Table
- Out of the Box Tables
- Types of Tables in Servicenow
- Extended Table and Referenced Tables
- Major Table in Servicenow
- Importance of Schema Map
- Creating Custom Table
- Deleting Custom Tables
- Defaults Fields in Custom Table
- Describe u_
- Dictionary Entries
- Creating Countries and Locations
- Assign roles to Users and Groups
- Delegate Users
- Current Logged in Users
- Active Transitions
- User Preferences

---

### Lesson 11 - User Administration
- Introduction to User Administration
- Creating Users
- Types of User Interfaces in Servicenow
- Difference Between End User, ITIL User, Administration
- Working with Groups
- Working with Roles
- Creating Department and Company
- Creating Countries and Locations
- Assign roles to Users and Groups
- Delegate Users
- Current Logged in Users
- Active Transitions
- User Preferences

---

### Lesson 12 – Incident Management Life Cycle and State Model
- Introduction to Incident Management
- What is Incident
- Life Cycle of Incident Management
- Working with State Model

---

### Lesson 13 – Data Lookup Rules
- Introduction to Data Lookup Rules
- Creating New Data Lookup Rule
- Modify Existing Data Lookup Rule
- Data Lookup Rule Tables of Incident and Problem
- Working with Data Lookup Definition
- Work with Record Macher

---

### Lesson 14 – Assignment Lookup Rules
- Introduction to Assignment Lookup Rule
- Defining Assignment Rules
- Creating New Assignment Rule
- Precedence Between Data Lookup and Assignment and Business Rules

---

### Lesson 15 – UI Policy
- Introduction to UI Policy
- Use of UI Policy
- Create UI Policies for Incident Table
- Working with More UI Policies
- UI Policy Terminology
- Converting an UI Policy to Data Policy
- Describe Global, On Load, Reverse If false and Inherit for UI Policy
- Working with Hide Related Lists

---

### Lesson 16 – Data Policy
- Introduction to Data Policy and Usage
- Creating Data Policy Rules
- Converting Data Policy to UI policy
- Applying Data Policies to Incident Table
- Difference between UI policy and Data Policy

---

### Lesson 17 – Metrics
- Introduction to Metrics
- What is Metrics and Usage
- Creating New Metric Definition

---

### Lesson 18 – Related Lists
- Introduction to Related Lists
- Working with Related Lists
- Creating New Related List and Add to Form

---

### Lesson 19 – Service Level Management
- Introduction to Service Level Management (SLM)
- Describing SLA
- Types of SLA's
- Working with SLA, OLA and UC
- Understand Existing SLA Definition
- Creating New SLA Definition for Incident Table
- SLA Targets
- Schedule SLA Definitions
- Importance of Retroactive Start and Pause
- SLA Calculation
- Tracking of SLA Definition

---

### Lesson 20 – Import Sets
- Introduction to Import Sets
- Data Import Process
- Preparing Data for Import
- Data Loading
- Creating Transform Map
- Fields Mapping
- Work with Coalesce
- Working with Multiple Coalesce
- Run Transform Map
- Importing Data Sources
- Schedule Import Sets
- Transform Event Scripts
- Transformation Event Script Variable

---

### Lesson 21 - Update Sets
- Introduction to Update Sets
- Importance of Update Sets
- Update Sets Tables
- What Update Sets Captured and Does Not Captured
- Default Update Sets
- Update Sets Administration
- Create New Local Update Sets
- Working with Retrieved Update Sets
- Update Sets Practical Exercise
- Preview and Commit Update Sets
- Migrating Update Sets
- Merge Update Sets
- Back Out Changes from Target Instance
- Update Sets Precautions
- Update Sets States

---

### Lesson 22 - Service Catalog
- Introduction to Service Catalog
- Configure Service Catalogs
- Configure Categories
- Create Catalog Item
- Adding Service Catalog to Service Portal
- Types of Catalog Item
- Record Producers
- Types of Variables
- Order Guides
- Working with Rule Base
- Working with Cascade Variable
- Working with Variable Sets
- Working with User Criteria
- Catalog UI Policy
- Catalog Client Scripts
- Creating Variable Attributes
- Working with Reference Qualifier
- Service Catalog Properties
- Fulfillment Groups
- Catalog Request Report
- Variable Default Sizes
- Working with Regular Expressions

---

### Lesson 23 - Workflow
- Introduction to Workflow
- Workflow Core Activities
- Creating New Workflow
- Workflow Editor
- Stages Sets
- Active Contexts
- Workflow Administration
- Activity Definition
- Workflow Versions
- Workflow Properties
- Validate Workflow
- Scheduled Workflow
- Add workflow to Catalog Item

---

### Lesson 24 – Execution Plan (Optional)
- Introduction to Execution Plan
- Create Execution Plan Task
- Create Execution Plan Variables

---

### Lesson 25 – Reports & Dash Boards
- Introduction to Reports
- Types of Reports
- Creating New Report
- Deleting Report
- Reports add to Dash Board
- Report Sharing
- Scheduling Reports
- Publish and Unpublish the Reports
- Report Properties
- Reports Statistics
- Working with Gauges
- Introduction to Dash Boards
- Create New Dash Board
- Responsive Non Responsive Dash boards
- Difference Between Home Page and Dash Board

---

### Lesson 26 – Access Control List
- Introduction to System Security
- Importance of Elevate Roles and Security Admin
- Creating New ACL Rule
- Levels of ACL (Table and Field)
- ACL Operations
- ACL Execution Order
- Types of ACL's
- Describing Table and None
- Describing * and None
- Describing * and *
- Describing Table and Field

---

### Lesson 27 – Email Notifications
- Introduction to System notifications
- Purpose of Email Notifications
- Creating New Email Notification
- Email Notification Tabs
- Preview Notification
- Email Templates
- Notifications on Event is fired
- Notifications on Triggered
- Configure Email Notification
- Working with Notification Email Scripts
- Omit Watermarks in Email Notifications
- Send Email Notification to CC
- Allow Digest
- Email Subscription
- Push Notifications

---

### Lesson 28 – Configure MID Server
- Introduction to MID Server
- Create MID Server User Record
- Download MID Server Windows 64 bit
- Install MID Server in Servicenow Instance
- Validating MID Server
- MID Server Capabilities
- MID Server Dash Board

---

### Lesson 29 – Cloning Instance
- Introduction Cloning
- Use of Cloning
- Cloning Instance

---

### Lesson 30 – Working with Major Incident Management
- Introduction to Major Incident Management
- Creating Major Incident Candidate
- Creating Major Incident
- Importance of Candidates
- Major Incident Trigger Rules
- Properties of Major Incidents
- Promote to Major Incident
- Propose Major Incident

---

### Lesson 31 - Problem Management Lifecycle and State Model
- Brief Introduction to Problem
- Problem Definition
- Creating Problem Record
- Add associated Incidents to Problem
- Problem Life Cycle and State Model
- Default States in Problem
- Knowledge Article Usage in Problem
- Communicate Workaround for Problem
- Communicate a Fix
- Create Known Article in Problem
- Working with Problem Task

---

### Lesson 32 - Change Management Lifecycle and State Model
- Introduction to Change Management
- Create Change Request
- Change Request Table
- Create change request from Incident
- Types of Changes
- Elaborate Simple, Standard and Emergency Changes
- Standard Change Catalog
- Change Lifecycle and State Model
- Create Standard Template add to Catalog
- Working with Risk Calculation
- Working with Risk Assessment
- Change Management Plugins
- Unauthorized Change Request
- Change Properties

---

### Lesson 33 - Knowledge Management Lifecycle and State Model
- Introduction to Knowledge Management
- Use of Knowledge Articles
- Knowledge Management Lifecycle and State Model
- Configure Knowledge Management
- Create New Article and Publish
- Retired Article
- Create Knowledgebase
- Knowledge Management Role
- Working with Open Submission
- Working with Feedback Management
- Knowledge Administration
- User Criteria in Knowledge Management
- Integrating Knowledge Articles in Incident and Service Portal
- Knowledge Articles Workflow's
- Instant Publish and Retired
- Approval Publish and Retired
- Knowledge Coach

---

## 💻 DEVELOPMENT COURSE CURRICULUM

---

### Lesson 1 - Java Script Fundamentals
- Java Script Introduction
- History of Java Script
- Client Side Java Script and Server Side Java Script
- Java Script Templates
- Use of template.Print
- Working with Single Line Comment and Multi line Comments
- Types of Variable
- Working with String and String Concatenation
- Working with Arrays
- Java Script Arithmetic Operators
- Java Script Assignment Operators
- Variables in Java Script
- Working with Mathematical Operations
- Work with Conditions (if, else if and else)
- Working with Switch Loop
- Working with Functions
- Java Script Objects
- Working with Random and Math's
- Java Script Error Handling

---

### Lesson 2 - Glide API's
- Introduction to Glide API's
- Overview of Glide API's
- Client Side Glide API's and Server Side Glide API's
- Working with Important Glide API's
- Glide Record
- Working with Glide Record Methods
- Glide Form
- Working with Glide Form Methods
- Glide User
- Working with Glide User Methods
- Glide Session
- Working with Glide Session Methods
- Glide Date
- Working with Glide Date Methods
- Glide Data and Time
- Working with Glide Date and Time Methods
- Glide List
- Working with Glide List Methods
- Glide Element
- Working with Glide Elements Methods
- Glide Dialog Window
- Working with Glide Dialog Window Methods
- Glide Aggregation
- Working with Glide Aggregation Methods
- Glide Ajax

---

### Lesson 3 - Client Scripts
- Introduction to Client Scripts
- Purpose of Client Scripts and Where These are Run
- Types of Client Scripts
- Elaborate onLoad, onChange, onSubmit and onCellEdit Client scripts
- Create New Client Script
- Working with More Client Script Examples
- Catalog Client Script
- Difference Between Client Scripts and Catalog Client Scripts

---

### Lesson 4 - UI Actions
- Introduction to UI Actions
- Importance of UI Action
- Working with Existing UI Actions
- Create new UI Action
- Creating UI Actions into Different Places
- Working with Client Side UI Actions
- Importance of gsftsubmit in UI Action
- Working with more Examples

---

### Lesson 5 - Business Rules
- Introduction to Business Rules
- Importance of Business Rules
- Working with Display and Query Business Rule
- Working with Async and Sync business rule
- Business Rule Actions
- Prevent recursive business rules
- Working with existing business rules in PDI
- Create new business rule
- Global variables in Business Rule
- Working with more example

---

### Lesson 6 - UI Script
- Introduction to UI Scripts
- Working with Global UI Scripts
- Create new UI Script
- Run UI Scripts
- UI Scripts on Client Side

---

### Lesson 7 - Scheduled Jobs
- Introduction to Scheduled jobs
- Schedule jobs States
- Create new Schedule job
- Run Schedule jobs
- View Schedule Item

---

### Lesson 8 - Script Include
- Introduction to Script Include
- Use of Script Include
- Types of Script Include
- Server Side Script Include
- Client Side Script Include
- Difference Between Global Business Rule and Script Include
- Create New Script Include
- Calling Script Include into Business Rules
- Calling Script Include into Client Side

---

### Lesson 9 – Script Include with Glide Ajax
- Introduction to Glide Ajax
- Types of Glide Ajax
- Importance of Glide Ajax
- How to Call Script Include with Glide Ajax?

---

### Lesson 10 – Inbound Email Actions
- Introduction to Inbound Email Action
- Overview of Inbound Email Action
- Types of Incoming Email
- Create Inbound Email Action
- Importance of New, Reply and Forward

---

### Lesson 11 – Fix Scripts
- Introduction to Fix Script
- Create Fix Script
- Run Fix Script
- Testing Fix Scripts

---

### Lesson 12 – Transform Event Scripts
- Introduction to Transform Event Scripts
- Types of Event Scripts
- Working with All Types of Event Scripts
- Test Coalescing and The Transform Script

---

### Lesson 13 – Implementation
- Introduction to Implementation
- Working with Scope or Custom Applications
- Using All Servicenow Components to Implement Custom Application

---

### Lesson 14 – Integration (Optional)
- Out of the Box REST API
`;

const lines = curriculum.split('\n');
let currentCategory = '';
let currentCategorySlug = '';

// To safely backup existing file
const existingScheduledJobsPath = path.join(__dirname, 'client/src/content/learn/development/scheduled-jobs.md');
let scheduledJobsContent = '';
if (fs.existsSync(existingScheduledJobsPath)) {
  scheduledJobsContent = fs.readFileSync(existingScheduledJobsPath, 'utf8');
}

// Clear learn directory and recreate
const learnDir = path.join(__dirname, 'client/src/content/learn');
if (fs.existsSync(learnDir)) {
  fs.rmSync(learnDir, { recursive: true, force: true });
}
fs.mkdirSync(learnDir, { recursive: true });

let currentLessonNum = 0;
let currentLessonTitle = '';
let currentLessonTopics = [];

function saveLesson() {
  if (currentLessonTitle) {
    // Generate filename
    const fileSlug = currentLessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const fileName = fileSlug + '.md';
    const catDir = path.join(learnDir, currentCategorySlug);
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
    
    let content = '';
    
    if (fileSlug === 'scheduled-jobs' && scheduledJobsContent) {
      // Re-use existing content but update frontmatter
      content = scheduledJobsContent.replace(/order:\s*\d+/, 'order: ' + currentLessonNum);
    } else {
      content = '---\n' +
'title: ' + currentLessonTitle + '\n' +
'description: Complete guide for ' + currentLessonTitle + '\n' +
'duration: 45 mins\n' +
'difficulty: Beginner\n' +
'category: ' + currentCategory + '\n' +
'order: ' + currentLessonNum + '\n' +
'tags:\n' +
'  - ServiceNow\n' +
'  - ' + currentCategory + '\n' +
'lastUpdated: 2026-06-22\n' +
'author: NowScripts\n' +
'---\n\n' +
'# ' + currentLessonTitle + '\n\n' +
'Welcome to Lesson ' + currentLessonNum + ' of the ' + currentCategory + ' course.\n\n';

      for (const topic of currentLessonTopics) {
        content += '## ' + topic + '\n\nDetails about ' + topic + ' will go here.\n\n';
      }
    }
    
    fs.writeFileSync(path.join(catDir, fileName), content, 'utf8');
  }
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('## 🎓 ADMINISTRATION')) {
    currentCategory = 'Administration';
    currentCategorySlug = 'administration';
  } else if (line.startsWith('## 💻 DEVELOPMENT')) {
    saveLesson();
    currentLessonTitle = '';
    currentLessonTopics = [];
    currentCategory = 'Development';
    currentCategorySlug = 'development';
  } else if (line.startsWith('### Lesson')) {
    saveLesson();
    
    const match = line.match(/Lesson\s+(\d+)\s+[-–]\s+(.+)/);
    if (match) {
      currentLessonNum = parseInt(match[1]);
      currentLessonTitle = match[2].trim();
      currentLessonTopics = [];
    }
  } else if (line.startsWith('- ')) {
    currentLessonTopics.push(line.substring(2).trim());
  }
}

// save last lesson
saveLesson();

console.log('Curriculum populated successfully.');
