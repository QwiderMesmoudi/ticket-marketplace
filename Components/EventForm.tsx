import { FormEvent, useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export default function EventForm() {
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);
  const updateEventImage = useMutation(api.events.updateEventImage);
  const events = useQuery(api.events.getEvents) || [];

  const [selectedEvent, setSelectedEvent] = useState<Id<"events"> | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleEventSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEvent(e.target.value as Id<"events">);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedEvent && selectedImage) {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();

      // Step 3: Update the event with the image storage ID
      await updateEventImage({ eventId: selectedEvent, imageStorageId: storageId });

      // Reset form
      setSelectedEvent(null);
      setSelectedImage(null);
      if (imageInput.current) imageInput.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={handleEventSelect} value={selectedEvent || ""}>
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        accept="image/*"
        ref={imageInput}
        onChange={handleImageChange}
      />
      <button type="submit" disabled={!selectedEvent || !selectedImage}>
        Upload Image
      </button>
    </form>
  );
}