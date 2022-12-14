import telebot
import config
import dbworker
from config import token, channel_id, group_id
from telebot import types

# импортирование всего нужного для работы

bot = telebot.TeleBot(token)

def reset_chat(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    RU = types.KeyboardButton('🇷🇺 RU')
    PL = types.KeyboardButton('🇵🇱 PL')
    EN = types.KeyboardButton('🇬🇧 EN')
    UA = types.KeyboardButton('🇺🇦 UA')
    BE = types.KeyboardButton('🇴🇲 BE')
    markup.add(PL, RU, EN, UA, BE)
    bot.send_message(message.chat.id, "Well, let's start over. Choose the language", reply_markup=markup)
    dbworker.set_state(message.chat.id, config.States.S_LANGUAGE_SELECT.value)

@bot.message_handler(commands=['start'])
def start(message):
    dbworker.set_state(message.chat.id, config.States.S_START.value)
    if dbworker.get_current_state(message.chat.id) == config.States.S_START.value:
        markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
        RU = types.KeyboardButton('🇷🇺 RU')
        PL = types.KeyboardButton('🇵🇱 PL')
        EN = types.KeyboardButton('🇬🇧 EN')
        UA = types.KeyboardButton('🇺🇦 UA')
        BE = types.KeyboardButton('🇴🇲 BE')
        markup.add(PL, RU, EN, UA, BE)
        bot.send_message(message.chat.id, "Choose the language", reply_markup=markup)
        dbworker.set_state(message.chat.id, config.States.S_LANGUAGE_SELECT.value)

@bot.message_handler(commands=['reset'])
def reset(message):
    reset_chat(message)

@bot.message_handler(func=lambda message: dbworker.get_current_state(message.chat.id) == config.States.S_LANGUAGE_SELECT.value)
def bot_message(message):
    removeKeyboard = telebot.types.ReplyKeyboardRemove()
    if message.text == '🇷🇺 RU':
        bot.send_message(message.chat.id, 'Уважаемый пользователь, при составлении отзыва будьте честны, прикладывайте как можно более информации об опыте, оценке, результатах работы с нами. Всегда ваша, команда BDV 🧑‍💻', reply_markup=removeKeyboard)
        bot.send_message(message.chat.id, "Пожалуйста, оставьте ваш отзыв, прикрепляя необходимое изображение")
        dbworker.set_language(message.chat.id, config.Language.RUSSIAN.value)

    if message.text == '🇵🇱 PL':
        bot.send_message(message.chat.id, 'Drogi użytkowniku, pisząc recenzję, bądź szczery, dołącz jak najwięcej informacji o swoim doświadczeniu, ocenie, wynikach współpracy z nami. Zawsze Twój, zespół BDV 🧑‍💻', reply_markup=removeKeyboard)
        bot.send_message(message.chat.id, "Zostaw swoją opinię, dołączając wymagany obraz")
        dbworker.set_language(message.chat.id, config.Language.POLISH.value)
    if message.text == '🇬🇧 EN':
        bot.send_message(message.chat.id, 'Dear user, when writing a review, be honest, attach as much information as possible about your experience, rating, results of working with us. Always yours, BDV team 🧑‍💻', reply_markup=removeKeyboard)
        bot.send_message(message.chat.id, "Please, leave your review by attaching the required picture")
        dbworker.set_language(message.chat.id, config.Language.ENGLISH.value)
    if message.text == '🇺🇦 UA':
        bot.send_message(message.chat.id, 'Шановний користувач, при складанні відгуку будьте чесні, прикладайте якнайбільше інформації про досвід, оцінку, результати роботи з нами. Завжди ваша команда BDV 🧑‍💻', reply_markup=removeKeyboard)
        bot.send_message(message.chat.id, "Будь ласка, залиште ваш відгук, прикріплюючи необхідне зображення")
        dbworker.set_language(message.chat.id, config.Language.UKRAINIAN.value)
    if message.text == '🇴🇲 BE   ':
        bot.send_message(message.chat.id, 'Паважаны карыстач, пры складанні водгуку будзьце сумленныя, прыкладвайце як мага больш інфармацыі аб досведзе, адзнацы, выніках працы з намі. Заўсёды ваша, каманда BDV 🧑‍💻', reply_markup=removeKeyboard)
        bot.send_message(message.chat.id, "Калі ласка, пакіньце ваш водгук, прымацоўваючы неабходны малюнак")
        dbworker.set_language(message.chat.id, config.Language.BELORUSSIAN.value)
    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)

@bot.message_handler(func=lambda message: dbworker.get_current_state(message.chat.id) == config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value, content_types=["text", "photo"])
def user_pinning_photo(message):
    language = dbworker.get_current_language(message.chat.id)
    if not message.photo:
        if 20 <= len(message.text) <= 2400:
            bot.send_message(message.chat.id, "✅")
            bot.forward_message(channel_id, message.chat.id, message.message_id)
            bot.send_message(group_id, f'@{message.from_user.username} прислал отзыв: {message.text[:30]}')

            reset_chat(message)
        else:
            match language:
                case config.Language.ENGLISH.value:
                    bot.send_message(message.chat.id, "❌ Invalid review format (must be more than 20 characters and less than 2400 characters)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
                case config.Language.RUSSIAN.value:
                    bot.send_message(message.chat.id, "❌ Неверно составленный отзыв (отзыв должен составлять не менее 20 и не более 2400 символов)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
                case config.Language.POLISH.value:
                    bot.send_message(message.chat.id, "❌ Błędna opinia (opinia musi mieć co najmniej 20 i nie więcej niż 2400 znaków)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
                case config.Language.UKRAINIAN.value:
                    bot.send_message(message.chat.id, "❌ Неправильно складений відгук (відкликання має становити не менше 20 і не більше 2400 символів)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
                case config.Language.BELORUSSIAN.value:
                    bot.send_message(message.chat.id, "❌ Няслушна складзены водгук (водгук павінен складаць не менш за 20 і не больш за 2400 сімвалаў)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
    else:
        if 20 <= len(message.caption) <= 2400:
            bot.send_message(group_id, f'@{message.from_user.username} прислал отзыв: {message.caption[:30]}')
            bot.forward_message(channel_id, message.chat.id, message.message_id)
            bot.send_message(message.chat.id, "✅")
            reset_chat(message)
        else:
            match language:
                case config.Language.ENGLISH.value:
                    bot.send_message(message.chat.id, "❌ Invalid review format (must be more than 20 characters and less than 2400 characters)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
                case config.Language.RUSSIAN.value:
                    bot.send_message(message.chat.id, "❌ Неверно составленный отзыв (отзыв должен составлять не менее 20 и не более 2400 символов)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
                case config.Language.POLISH.value:
                    bot.send_message(message.chat.id, "❌ Błędna opinia (opinia musi mieć co najmniej 20 i nie więcej niż 2400 znaków)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
                case config.Language.UKRAINIAN.value:
                    bot.send_message(message.chat.id, "❌ Неправильно складений відгук (відкликання має становити не менше 20 і не більше 2400 символів)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
                case config.Language.BELORUSSIAN.value:
                    bot.send_message(message.chat.id, "❌ Няслушна складзены водгук (водгук павінен складаць не менш за 20 і не больш за 2400 сімвалаў)")
                    dbworker.set_state(message.chat.id, config.States.S_REVIEW_TEXT_OR_TEXT_AND_PHOTO.value)
    
bot.polling(none_stop=True)