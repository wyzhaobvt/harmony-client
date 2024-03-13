import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIcon } from "@radix-ui/react-icons";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

export function ProfilePicture({ image, className }) {
  let myImage = "";

  if (image.includes("user-avatar/")) {
    const cld = new Cloudinary({
      cloud: {
        cloudName: "dsyha6lpv",
      },
    });

    myImage = cld.image(image);
  }

  return (
    <Avatar className={className}>
      {myImage ? (
        <AdvancedImage cldImg={myImage} />
      ) : (
        <>
          <AvatarImage
            src={image}
            alt="Profile Picture"
            className="object-cover"
          />
          <AvatarFallback
            className={`bg-white border border-neutral-200 ${className}`}
          >
            <AvatarIcon className="text-neutral-300 size-2/3" />
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );
}
