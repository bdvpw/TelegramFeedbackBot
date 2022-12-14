from enum import Enum

token = '5332779198:AAGMyLQyPhtPnm74OcanweyY3PxbksthY7I'  # токен бота
channel_id = "-1001688424947"  # айди канала
group_id = "-1001692860072"  # айди группы

"""
айди группы и канала можно узнать у @username_to_id_bot
"""

class States(Enum):
    S_START = "0"
    S_LANGUAGE_SELECT = "1"
    S_LEAVE_REVIEW_BUTTON = "2"
    S_REVIEW_TEXT_OR_TEXT_AND_PHOTO = "3"
    S_REVIEW_PHOTO = "4"  # класс отвечающий за состояние

class Language(Enum):
    RUSSIAN = "1"
    POLISH = "2"
    ENGLISH = "3"
    UKRAINIAN = "4"
    BELORUSSIAN = "5"  # класс отвечающий за языки