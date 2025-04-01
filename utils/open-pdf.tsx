import { Linking, Alert, PermissionsAndroid, Platform } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

const getContentUri = async (filePath: string) => {
  return `file://${filePath}`;
};

const checkPermissions = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  if (Platform.Version >= 33) {
    // Для Android 13+ (API 33+) запрашиваем READ_MEDIA_IMAGES/VIDEO/AUDIO или READ_EXTERNAL_STORAGE
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } else {
    // Для старых версий запрашиваем WRITE_EXTERNAL_STORAGE
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
};

export async function openPdf(link: string): Promise<void> {
  try {
    // Проверяем разрешения
    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      Alert.alert('Ошибка', 'Необходимо разрешение на доступ к хранилищу');
      return;
    }

    const downloadDir = RNFS.CachesDirectoryPath;

    const localPath = `${downloadDir}/temp_pdf_${Date.now()}.pdf`;

    // Скачиваем файл
    await RNFS.downloadFile({
      fromUrl: link,
      toFile: localPath,
    }).promise;

    // Пытаемся открыть через FileViewer
    try {
      await FileViewer.open(localPath, {
        showOpenWithDialog: true,
        onDismiss: () => RNFS.unlink(localPath).catch(() => {}),
      });
    } catch (fileViewerError) {
      console.log('FileViewer error:', fileViewerError);

      try {
        // Используем content:// URI вместо file://
        const contentUri = await getContentUri(localPath);
        await Linking.openURL(contentUri);
      } catch (intentError) {
        console.log('Intent error:', intentError);
        throw new Error('Не найдено приложение для просмотра PDF');
      }

      // Альтернативный способ открытия

      try {
        await Linking.openURL(`file://${localPath}`);
      } catch (linkingError) {
        console.log('Linking error:', linkingError);
        throw new Error('No app available to open PDF');
      }
    }
  } catch (error) {
    Alert.alert(
      'Ошибка',
      'Не найдено приложение для просмотра PDF. Установите PDF-ридер.',
      [
        {
          text: 'Установить Adobe Reader',
          onPress: () =>
            Linking.openURL('market://details?id=com.adobe.reader'),
        },
        { text: 'Отмена' },
      ],
    );
    console.error(error);
  }
}
