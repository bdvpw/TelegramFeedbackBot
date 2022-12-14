import pickledb

db = pickledb.load('bot.db', True)


def get_current_state(chat_id):
    return db.get(str(chat_id))


def set_state(chat_id, value):
    db.set(str(chat_id), str(value))

def get_current_language(chat_id):
    return db.get(str(chat_id) + "_LANGUAGE")

def set_language(chat_id, value):
    db.set(str(chat_id) + "_LANGUAGE", str(value))
