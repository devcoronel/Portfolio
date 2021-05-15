from fastapi import FastAPI, Form, Request, BackgroundTasks
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from starlette.responses import JSONResponse
from starlette.exceptions import HTTPException 

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from pydantic import EmailStr

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
templates = Jinja2Templates(directory="templates")

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return RedirectResponse("/")

@app.get("/", response_class=HTMLResponse)
@limiter.limit("4/second")
async def root(request: Request):
    return templates.TemplateResponse("aboutme.html", {"request": request}) 

@app.get("/studies", response_class=HTMLResponse)
@limiter.limit("4/second")
async def studies(request: Request):
    return templates.TemplateResponse("studies.html", {"request": request})

@app.get("/proyects", response_class=HTMLResponse)
@limiter.limit("4/second")
async def proyects(request: Request):
    return templates.TemplateResponse("proyects.html", {"request": request})

@app.get("/contactme", response_class=HTMLResponse)
@limiter.limit("4/second")
async def contactme(request: Request):
    return templates.TemplateResponse("contactme.html", {"request": request})

# Email creation
conf = ConnectionConfig(
    MAIL_USERNAME = "dcoronelvilca@gmail.com",
    MAIL_PASSWORD = "mypassword",
    MAIL_FROM = "dcoronelvilca@gmail.com",
    MAIL_PORT = 587,
    MAIL_FROM_NAME = "dcoronelvilca",
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True
)

@app.post("/contactme")
async def sendemail(background_tasks: BackgroundTasks,email: EmailStr = Form(...),subject: str = Form(...),body: str = Form(...))-> JSONResponse:

    message = MessageSchema(
        subject = "{} : {}".format(email, subject),
        recipients = ['dcoronelvilca@gmail.com'],
        body = body
    )
    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message)
    return JSONResponse(status_code=200, content={"msg": "Email sended successfully"})
