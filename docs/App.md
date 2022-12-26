React Bileşeni: App
Bu modül, App adında bir React bileşenini tanımlar. Aşağıdaki işlemleri yapar:

Aşağıdaki bağımlılıkları içerir:
React: Kullanıcı arayüzleri oluşturmak için kullanılan bir JavaScript kütüphanesi
React Navigation: Bir React uygulamasında gezinmeyi uygulamanın kullanılan bir kütüphane
Eva Design: Benzer görünüm ve hissiyat sağlayan kullanıcı arayüzleri oluşturmak için bir tasarım sistemi
UI Kitten: Eva Design ile çalışan özelleştirilebilir UI bileşenleri koleksiyonu
Toast Message: React Native uygulamalarında toast mesajları göstermek için kullanılan bir kütüphane
Redux: JavaScript uygulamaları için bir durum yönetimi kütüphanesi
src dizininden birkaç modül
createStore işlevi ve src/reducers/index modülünden içeri aktarılan reducer kullanarak bir Redux mağazası oluşturur
App bileşenini, JSX elementi döndüren bir işlev olarak tanımlar. JSX elementi şunları içerir:
react-redux kütüphanesinden bir Provider bileşeni, Redux mağazasını uygulamanın geri kalanına context üzerinden sağlar
@react-navigation/native kütüphanesinden bir NavigationContainer, içinde şunları içerir:
@ui-kitten/components kütüphanesinden bir ApplicationProvider, içinde şunları içerir:
src/navigators/AuthNavigator modülünden içeri aktarılan AuthNavigator bileşeni
react-native-toast-message kütüphanesinden bir Toast bileşeni
