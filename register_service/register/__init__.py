from flask import Flask, render_template, session, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'

bootstrap = Bootstrap(app)
moment = Moment(app)


class RegisterForm(FlaskForm):
    userName = StringField('Please enter your Username', validators=[DataRequired()])
    phone = StringField('Please enter your phone number', validators=[DataRequired()])
    submit = SubmitField('Submit')


@app.route('/', methods=['GET', 'POST'])
def index():
    form = RegisterForm()
    if form.validate_on_submit():
        session['userName'] = form.userName.data
        session['phone'] = form.phone.data
        return redirect(url_for('index'))
    return render_template('index.html', form=form, name=session.get('userName'))

