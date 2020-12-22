from flask_sqlalchemy import SQLAlchemy
from app.models.user_model import UserModel

db = SQLAlchemy()

class UserRepository():

    def get(self, mail_address: int):
        user = UserModel.query.filter_by(mail_address=mail_address).one_or_none()
        return user.to_dict()

    def update_login_date(self, user_id: int):
        try:
            print('start remainder update')
            user_model = db.session.query(UserModel).filter_by(id=user_id).first()
            user_model.update_last_login_date()
            db.session.add(user_model)
            db.session.commit()
            return True, 'update success'
        except BaseException as e:
            db.session.rollback()
            raise e
