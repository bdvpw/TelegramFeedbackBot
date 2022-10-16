# Инструменты для тестирования
Окей, вы настроили конфиги бота, но хотите убедится что всё сделали правильно? В таком случае вам могут помощь некоторые из этих команд.

## Тесты
Чтобы проверить, всё ли правильно у вас с конфигурацией, введите команду: `yarn run configTest`

В случае успеха вы должны получить нечто такое:
![Все тесты пройдены успешно](../screenshots/successfulConfigTest.png "Все тесты пройдены успешно")

В целом тесты делятся на несколько этапов:
1. Проверка наличия .env файла и токена в нём.
2. Проверка [basic.json](../../src/config/basic.json) на наличие ошибок.
3. Проверка [commandsInfo.ts](../../src/config/commandsInfo.ts), в котором проверяется чтобы краткое описание не было пустым или не превышало определённое количество символов.
4. Подключение к Telegram и проверка на действительный токен и проверка на существование чата и канала из basic.json. Если в `chatIdWithReviews` или `channelIdWithReviews` установлено значение `null` - эти тесты будут пропущены.

Мы рекомендуем вам делать тестирование при каждом изменении конфига!
## Возможные ошибки при тестировании
### **Error: ENOENT: no such file or directory, access '.env'**
Ошибка говорит о том, что вы не создали файл .env в корне директории. Проверьте его наличие и при отсутствии - создайте.
![Список всех файлов в корневом каталоге бота](../screenshots/files.png "Список всех файлов в корневом каталоге бота")

### **Error: Empty token!**
Вы не указали токен бота в `.env` файле. Проверьте, чтобы ваш файл выглядил примерно так:
```fix
TELEGRAM_BOT_TOKEN=3829410421:AIO_dhjlskAJKLDJlkd_S9d879S
```

### **Error: Could not read src/config/basic.json file.**
### **SyntaxError: Unexpected token s in JSON at position** ***X***
Вы допустили какую-либо ошибку в [basic.json](../../src/config/basic.json) файле. Убедитесь что вы соблюдаете синтаксические правила JSON формата, не ставьте лишних запятых, кавычки не забываете закрывать.

### **TypeError: Has the type STRING, but should be BOOLEAN.**
Похоже, вы установили неправильный тип для какого-то свойства. Конкретно в данном случае на скриншоте ниже мы установили для свойства "`attachedImage`" строку, а должны были boolean (`true`/`false`) 
![Пример ошибки](../screenshots/example_error.png "Пример ошибки")

### **Error: The minimum value is set higher than the maximum.**
Убедитесь, что свойство `minimumNumberOfCharactersInAReview` в [basic.json](../../src/config/basic.json) не было больше свойства `maximumNumberOfCharactersInAReview`

### **Error: In the /cmd command, the length of the shortDescription cannot be zero.**
Проверьте файл [commandsInfo.ts](../../src/config/commandsInfo.ts), похоже вы где-то забыли установить краткое описание команде.

### **Error: Failed to connect to the bot. You may have incorrectly specified the token in the .env file or you do not have an internet connection.**
Проверьте подключение к интернету и правильность токена.

### **Error: The chat was not found! Make sure you have entered the correct ID.**
Неправильно указан ID канала или чата. Если у вас чат был приватным и стал публичным (или наоборот) - пропишите `/chatID` чтобы получить новый ID.

----
> Вернутся к [README.md](./README.md)