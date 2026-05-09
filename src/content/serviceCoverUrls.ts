// Превью для списка /uslugi (как og:image на страницах demontagmsk.ru).
// Обновить все URL: node tools/build-service-cover-urls.mjs
import type { CanonicalServiceSlug } from "./canonical";

export const serviceCoverUrls: Record<CanonicalServiceSlug, string> = {
  "almaznaya-rezka":
    "https://static.tildacdn.com/tild3031-3365-4362-b165-613163333631/2023-03-30_17-48-22-.png",
  "demontaj-bany":
    "https://static.tildacdn.com/tild3233-6362-4061-b534-303930343837/fotor_2023-4-21_23_1.jpg",
  "demontaj-betona":
    "https://static.tildacdn.com/tild6334-6638-4139-b264-313231633834/fotor_2023-4-21_22_4.jpg",
  "demontaj-derevyannyh-domov":
    "https://static.tildacdn.com/tild3436-6537-4336-b938-656166383964/fotor_2023-4-22_13_2.jpg",
  "demontaj-dverey":
    "https://static.tildacdn.com/tild6239-3035-4234-a235-326439336134/fotor_2023-4-19_18_5.jpg",
  "demontaj-fundamenta":
    "https://static.tildacdn.com/tild3466-3732-4138-b935-616364303365/fotor_2023-4-19_17_1.jpg",
  "demontaj-garazha":
    "https://static.tildacdn.com/tild3264-3239-4566-b066-303836343664/fotor_2023-4-19_17_5.jpg",
  "demontaj-kanalizatsii":
    "https://static.tildacdn.com/tild3462-3332-4262-b239-633333663365/fotor_2023-4-19_19_9.jpg",
  "demontaj-karkasnih-zdaniy":
    "https://static.tildacdn.com/tild6437-3737-4561-b665-356631663135/fotor_2023-4-22_13_7.jpg",
  "demontaj-kuhny":
    "https://static.tildacdn.com/tild3533-6435-4739-b233-343031336236/fotor_2023-4-21_23_0.jpg",
  "demontaj-monolita":
    "https://static.tildacdn.com/tild3963-3862-4734-b865-626237343464/fotor_2023-4-19_17_4.jpg",
  "demontaj-ofisa":
    "https://static.tildacdn.com/tild6137-3730-4365-b061-363733346236/fotor_2023-4-19_18_1.jpg",
  "demontaj-parketa":
    "https://static.tildacdn.com/tild6532-6633-4062-a337-346233636461/fotor_2023-4-22_13_3.jpg",
  "demontaj-plitky":
    "https://static.tildacdn.com/tild6533-6337-4231-b561-363633363837/fotor_2023-4-19_18_3.jpg",
  "demontaj-promishlennyh-zdaniy":
    "https://static.tildacdn.com/tild6636-3336-4361-b936-346535393532/fotor_2023-4-22_12_5.jpg",
  "demontaj-saraya":
    "https://static.tildacdn.com/tild6161-3337-4538-b165-306265323534/fotor_2023-4-22_13_5.jpg",
  "demontaj-vanny":
    "https://static.tildacdn.com/tild6533-3363-4665-a537-313931646263/fotor_2023-4-19_18_2.jpg",
  "demontaj-verandy":
    "https://static.tildacdn.com/tild3561-3764-4564-a237-643739303639/fotor_2023-4-22_14_1.jpg",
  "demontaj-vivezky":
    "https://static.tildacdn.com/tild6162-6134-4935-b535-653134306266/fotor_2023-4-19_19_2.jpg",
  "demontazh-doma":
    "https://static.tildacdn.com/tild6464-3235-4866-b463-396365356134/2023-03-30_17-48-22-.png",
  "demontazh-inzhenernyh-setej-i-kommunikacij":
    "https://static.tildacdn.com/tild6631-3062-4635-b436-376630373131/2023-03-30_17-48-22-.png",
  "demontazh-konstrukciy":
    "https://static.tildacdn.com/tild3230-3231-4562-a533-373838313265/Vector_163_1.png",
  "demontazh-metallokonstrukcij":
    "https://static.tildacdn.com/tild3031-3365-4362-b165-613163333631/2023-03-30_17-48-22-.png",
  "demontazh-nalivnogo-pola":
    "https://thb.tildacdn.com/tild3566-3837-4438-b932-376433313633/-/resize/504x/010_original.jpg",
  "demontazh-santehkabiny":
    "https://static.tildacdn.com/tild3965-3833-4463-b661-326563303137/2023-03-30_17-48-22-.png",
  "demontazh-sten":
    "https://static.tildacdn.com/tild6363-6366-4130-a433-623461613035/2023-03-30_17-48-22-.png",
  demontazh_potolka:
    "https://static.tildacdn.com/tild6537-3939-4131-b038-316661363632/2023-03-30_17-48-22-.png",
  demontazh_stjazhki:
    "https://static.tildacdn.com/tild3163-6462-4865-b034-386662373163/_2025-07-09_12520160.png",
  "snos-zdaniy":
    "https://static.tildacdn.com/tild3437-3364-4830-b437-636663313234/fotor_2023-4-19_17_3.jpg",
  /** Берём og:image со старой страницы `/vyvoz-stroitelnogo-musora`. */
  "vyvoz-musora-posle-demontazha":
    "https://thb.tildacdn.com/tild3832-6262-4661-b263-616266636430/-/resize/504x/i_1.jpg",
};
