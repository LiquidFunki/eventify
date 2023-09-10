# Eventify api

<p>This project was done as a back-end part of the full-stack project for the ucode-connect</p>

<h2>Technologies Used</h2>

<ul>
    <li>NodeJs</li>
    <li>Express</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>GoogleAuth</li>
</ul>
<h2>Setup</h2>

<p>Clone down this repository. You will need node and npm installed globally on your machine.
</p>
<p> 
Installation

`npm install`

To Start Server:

`npm start`

To Visit App:

`http://localhost:5000/`

</p>

<h2>Using the API</h2>
<p>
    <b>Authorization module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>POST - /api/auth/register</code></td>
                <td>Registration of a new user, required parameters are[login, password, password confirmation, email, country, language]</td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/login</code></td>
                <td>Log in user, required parameters are [login, password]</td>
            </tr>
            </tr>
            <tr>
                <td><code>POST - /api/auth/google</code></td>
                <td>Authorization with google, required parameters are [token]</td>
            </tr>
            <tr>
                <td><code>GET - /api/auth/refresh</code></td>
                <td>Refresh token</td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/logout</code></td>
                <td>Log out authorized user</td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/password-reset</code></td>
                <td>Send a reset link to user email, required parameter is [email]</td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/password-reset/:confirm_token</code></td>
                <td>Confirm new password with a token from email, required parameter is a [new password]</td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>User module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/users</code></td>
                <td>Get all users</td>
            </tr>
            <tr>
                <td><code>GET - /api/users/:user_id</code></td>
                <td>Get specified user data</td>
            </tr>
            <tr>
                <td><code>PATCH - /api/users/</code></td>
                <td>Update profile data</td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>Company module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/company</code></td>
                <td>Get all companies</td>
            </tr>
            <tr>
                <td><code>GET - /api/company/my</code></td>
                <td>Get all my companies</td>
            </tr>
            <tr>
                <td><code>GET - /api/company/:id</code></td>
                <td>Get specified company data</td>
            </tr>
            <tr>
                <td><code>POST - /api/company</code></td>
                <td>Create a new company, required parameters [name]</td>
            </tr>
            <tr>
                <td><code>PATCH - /api/company/:id</code></td>
                <td>Update the specified company, required parameters [name]</td>
            </tr>
            <tr>
                <td><code>DELETE - /api/company/:id</code></td>
                <td>Delete the company</td>
            </tr>
            <tr>
                <td><code>DELETE - /api/company/participant/:post_id</code></td>
                <td>Delete a participant from company</td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>Event module</b>
        <table width="100%">
           <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/event</code></td>
                <td>Get all events</td>
            </tr>
            <tr>
                <td><code>GET - /api/event/categories</code></td>
                <td>Get all categories of events</td>
            </tr>
            <tr>
                <td><code>GET - /api/event/my</code></td>
                <td>Get all my events</td>
            </tr>
            <tr>
                <td><code>GET - /api/event/today</code></td>
                <td>Get all today events</td>
            </tr>
            <tr>
                <td><code>GET - /api/event/company/:companyId</code></td>
                <td>Get all events by company </td>
            </tr>
            <tr>
                <td><code>GET - /api/event/:id</code></td>
                <td>Get specified event</td>
            </tr>
            <tr>
                <td><code>POST - /api/event/subscribe/:id</code></td>
                <td>Subscribe to event by id</td>
            </tr>
            <tr>
                <td><code>POST - /api/event/unsubscribe/:id</code></td>
                <td>Unsubscribe to event by id</td>
            </tr>
            <tr>
                <td><code>POST - /api/event/</code></td>
                <td>Create a new event, required parameter is [title, description, location, price, maxAttendees, organizer, categories]</td>
            </tr>
            <tr>
                <td><code>PATCH - /api/event/:id</code></td>
                <td>Edit event by id, required parameter is [title, description, location, price, maxAttendees, organizer, categories]</td>
            </tr>
            <tr>
                <td><code>DELETE - /api/event/:id</code></td>
                <td>Delete the event</td>
            </tr>
        </table>
    </p>
    <p><b>Comment module</b>
        <table width="100%">
           <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/comment/:eventId</code></td>
                <td>Get all comments of event</td>
            </tr>
            <tr>
                <td><code>POST - /api/comment/:eventId</code></td>
                <td>Create comment for event</td>
            </tr>
            <tr>
                <td><code>PATCH - /api/comment/:id</code></td>
                <td>Edit comment for event</td>
            </tr>
            <tr>
                <td><code>DELETE - /api/comment/:id</code></td>
                <td>Delete the comment</td>
            </tr>
        </table>
    </p>

<h2>Contact</h2>
<p><span style="margin-right: 30px;"></span><a href="https://github.com/Vlad-Makarenko"><img target="_blank" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style="width: 10%;"></a>
<a href="https://github.com/Vlad-Makarenko"><img target="_blank" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style="width: 10%;"></a></p>
