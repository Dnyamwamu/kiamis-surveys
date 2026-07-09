# 🚜 Household Farmers Module

The Household Farmers Module is the core component of KIAMIS, responsible for managing the registry of small-scale farmers across all 47 counties in Kenya. The module includes a two-level validation process: records are first reviewed at the ward level by Ward Officers, and then undergo a second review at the county level by County Officers, who approve or reject the registrations.

## Features

### 1. Analytics
- **Status Cards**: Metric cards for Total Farmers, Verified Farmers, Ward Pending, County Pending and Rejected Farmers.

### 2. Farmer Registry
- **Comprehensive List**: A paginated view of all submitted farmer records with advanced filtering by County, Sub-County, and Ward.
- **Quick Search**: Search by National ID or Phone Number for immediate retrieval of farmer profiles.
- **Review Tab**: Visual tabs that group farmer records by review level status — All Farmers, Ward Pending, County Pending, Verified, and Rejected.

### 3. Detail View
- **Profile Summary**: Side-drawer access to complete farmer information including:
    - Farmer Details
    - Farm sections information
    - Metadata (Registration date, agripreneur info, device info, etc)
- **Location Map**: A map view displaying the farmer’s location alongside other farmers within the same zone.

## Registration Workflow
1. **Enumeration**: Farmer data is collected in the field by an Agripreneur using the KYF mobile application.
2. **Submission**: The collected data is submitted to the central KIAMIS registry by the Agripreneur.
3. **Validation**: Farmer profile details are reviewed and verified for completeness and accuracy.
4. **Ward Review**: The record is first reviewed at the ward level by a Ward Officer, who may approve or reject it.
5. **County Review**: Records approved at the ward level proceed to the county level, where a County Officer performs a second review and either approves or rejects them.
6. **Rejection Handling**: If a record is rejected at either the ward or county level, it is returned to the Agripreneur for correction and resubmission.
7. **Completion**: Once approved at both levels, the farmer record is marked as verified and officially added to the registry.


## 📖 User Manual: Step-by-Step Guide

### How to View the Household Farmers Registry
1. Navigate to **Farmers** in the sidebar.
2. The active tab will display a table listing household farmer records available for review.
3. Use the **Admin Unit Filter** to filter records by County, Sub-County, or Ward, depending on your access level.

### Role-Based Navigation & Notifications
To streamline the verification process, KIAMIS automatically tailors the dashboard based on your user role:
- **Ward Officers**: Upon signing in, you are automatically navigated to the **Ward Pending** tab. This view shows only the records awaiting your initial review.
- **County Officers**: Upon signing in, you are automatically navigated to the **County Pending** tab, showing records that have passed ward-level review and are ready for final county approval.
- **Pending Notifications**: Each tab features a notification badge showing the current count of records in that state. 
- **Dynamic Updates**: As you approve or reject records, these counts **depreciate in real-time**, allowing you to track your progress and clear your queue efficiently.

### How to Search for a Specific Farmer
1. Use the search bar in the top-right corner of the Farmers page.
2. Enter the farmer's **National ID** or **Phone Number**.
3. Press **Enter** or click the search icon.

### How to View Farmer Details
1. In the farmer table, click the **Actions** menu (three dots) on the left side of a row.
2. Select **View details** from the dropdown menu.
3. A side drawer will open displaying the complete profile, location, and farm data.

### How to Approve or Reject a Farmer Record
> [!NOTE]
> This action is only available to **Ward Officers** and **County Officers**.

1. Depending on your role, the active tab will display the records awaiting your review.
2. Click the **Actions** menu (three dots) for a specific farmer.
3. Select **View details** to open the detail drawer.
4. Review the registration data thoroughly.
5. In the footer of the drawer:
    - Click **Approve** to move the record to the next stage.
    - Click **Reject** to send the record back. (You will be prompted to provide **Remarks** explaining the reason for rejection).
6. Or Click the **Actions** menu (three dots) for a specific farmer and select **Approve** or **Reject**.
7. Confirm the action in the dialog box that appears.

### Rejection Criteria
> [!NOTE]
A record may be rejected if the submitted information is incomplete, inaccurate, inconsistent, duplicated, or does not meet the required data validation standards. Rejected records are returned for correction and resubmission.

### How to View Sensitive Data (Masking)
By default, National ID numbers and phone numbers are masked to protect farmers’ personal data and ensure compliance with the Office of the Data Protection Commissioner (ODPC) data privacy and protection regulations.
1. Click the **Show Sensitive Data** button in the top-right corner of the Farmers page.
2. If it's your first time, you must read and **Accept the Terms and Conditions**.
3. Once accepted, all IDs and phone numbers will be visible in plain text.
4. Click **Hide Sensitive Data** to re-mask the information.

### How to Navigate to Linked Records
- **Zone Details**: Click on a **Zone Code** in the table to open its detail drawer.
- **Agripreneur Info**: Click on an **Agripreneur Name** to see the profile of the agent who collected the data.
- **Approver Profiles**: Click on **Ward Approver** or **County Approver** names to view the details of the official who processed the record.


