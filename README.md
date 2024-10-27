# WarriorConnect

UW CSC Project to connect students bases on courses and faculty

# Features:

**Language:** Javascript (React), bootstrap, html, Postgres, Flask, PyTorch
**Name:** WarriorConnect
**Login + Registration:** using WatIam
Ask user to provide their - Names - Profile picture - Import schedules/manually input courses (verify courses) - Upload transcript - Year, program, interests, contact information, a brief introduction, clubs, or study preferences, LinkedIn - Hiding feature. A future that gives the student the opportunity to hide certain details of the course like section number.
**Recommendation list:** show the name of the people (with year, program, interests and brief information) and you can send a request to your classmates. After that person approves it, all the more private information will be shown on the websitej
**AI:** matching interests

### Backend Setup

1. Open VSCode
2. Open a powershell terminal in the `dashboard-backend` folder:

   ```sh
   python -m venv .venv
   ```

3. In VSCode, click on the bottom right to select the interpreter. Select “Enter interpreter path” from the dropdown that appears and select “Find..”.
4. Select the Python.exe from `.venv/Scripts/python.exe`.
5. Restart VSCode.
6. In VSCode Terminal:

   ```sh
   pip install -r requirements.txt
   ```

   - if pip is not found:
   - ```sh
     py -m ensurepip --upgrade
     ```

     then try again

7. Run `app.py` using VSCode’s terminal.
